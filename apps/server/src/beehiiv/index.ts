import nodeFetch, { RequestInit } from 'node-fetch'
import {
  makePost,
  makePostList,
  makeSubscriber,
  Post,
  PostList,
  Subscriber,
} from './serialize'
import { getOrThrow } from '../utils'
import { logger } from '../telemetry'

const publicationId = getOrThrow(
  process.env.BEEHIIV_PUBLICATION_ID,
  'BEEHIIV_PUBLICATION_ID',
)

const apiUrl = getOrThrow(process.env.BEEHIIV_API_URL, 'BEEHIIV_API_URL')

const baseUrl = `${apiUrl}/publications/${publicationId}`
const token = getOrThrow(process.env.BEEHIIV_API_KEY, 'BEEHIIV_API_KEY')

const fetch = async (url: string, options?: RequestInit) => {
  const response = await nodeFetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}

// TODO: Super inefficient due to not being able to list/fetch a post by it's slight.
// Hoping beehiiv will add this functionality soon before this query gets too expensive.
const getPostBySlug = async (slug: string): Promise<Post> => {
  try {
    const params = new URLSearchParams()
    params.append('expand', 'premium_web_content')
    params.append('status', 'confirmed')

    const response = await fetch(`/posts?${params.toString()}`)

    const data = await response.json()

    const posts: Post[] = Array.isArray(data?.data)
      ? data.data.map((post: any) => makePost(post))
      : null

    const post = posts?.find(post => post.slug === slug)

    if (!post) {
      throw new Error('Post not found')
    }

    return post
  } catch (error) {
    logger.error(error)
    throw new Error('Failed to fetch post')
  }
}

const getPostList = async ({
  first = 10,
  after,
}: {
  first?: number
  after?: string
}): Promise<PostList> => {
  const limit = first
  const page = after ? parseInt(after, 10) + 1 : 1

  const params = new URLSearchParams()
  params.append('limit', limit.toString())
  params.append('page', page.toString())
  params.append('expand', 'premium_web_content')
  params.append('status', 'confirmed')

  try {
    const response = await fetch(`/posts?${params.toString()}`)

    const data = await response.json()

    return makePostList(data)
  } catch (error) {
    logger.error(error)
    throw new Error('Failed to fetch post list')
  }
}

const createSubscriber = async (
  email: string,
  {
    utmSource,
    utmMedium,
    utmCampaign,
    referringSite,
    referralCode,
  }: {
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string
    referringSite?: string
    referralCode?: string
  },
): Promise<Subscriber> => {
  const url = `/subscriptions`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        publication_id: publicationId,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: utmSource || 'promopepper',
        utm_medium: utmMedium || 'api',
        utm_campaign: utmCampaign || undefined,
        referring_site: referringSite || undefined,
        referral_code: referralCode || undefined,
      }),
    })

    const data = await response.json()

    if (data.data) {
      return makeSubscriber(data.data)
    } else {
      throw new Error('Invariant exception: data.data should exist')
    }
  } catch (error) {
    logger.error(error)
    throw new Error('Failed to create subscriber')
  }
}

export { getPostBySlug, getPostList, createSubscriber }
