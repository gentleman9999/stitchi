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

const publicationId = getOrThrow(
  process.env.BEEHIIV_PUBLICATION_ID,
  'BEEHIIV_PUBLICATION_ID',
)

const apiUrl = getOrThrow(process.env.BEEHIIV_API_URL, 'BEEHIIV_API_URL')

const baseUrl = `${apiUrl}/publications/${publicationId}`
const token = getOrThrow(process.env.BEEHIIV_API_KEY, 'BEEHIIV_API_KEY')

const postUrlSearchParams = new URLSearchParams()
postUrlSearchParams.append('expand', 'premium_web_content')
const postUrl = `/posts?${postUrlSearchParams.toString()}`

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
    const response = await fetch(postUrl.toString())

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
    console.error(error)
    throw new Error('Failed to fetch post')
  }
}

const getPostList = async (): Promise<PostList> => {
  try {
    const response = await fetch(postUrl.toString())
    const data = await response.json()
    return makePostList(data)
  } catch (error) {
    console.error(error)
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
    console.error(error)
    throw new Error('Failed to create subscriber')
  }
}

export { getPostBySlug, getPostList, createSubscriber }
