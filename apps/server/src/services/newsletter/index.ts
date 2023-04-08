import * as beehiiv from '../../beehiiv'
import { Subscriber } from '../../beehiiv/serialize'
import { beehiivPostToPost } from './serializer'
import { Post, PostList } from './types'

interface NewsletterClientService {
  getPost: (slug: string) => Promise<Post>
  listPosts: (params: { first?: number; after?: string }) => Promise<PostList>
  createSubscriber: (input: {
    email: string
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string
    referringSite?: string
    referralCode?: string
  }) => Promise<Subscriber>
}

interface MakeClientPramam {
  beehiivClient: typeof beehiiv
}

type MakeClientFn = (params?: MakeClientPramam) => NewsletterClientService

const makeClient: MakeClientFn = (
  { beehiivClient } = {
    beehiivClient: beehiiv,
  },
) => {
  return {
    getPost: async slug => {
      try {
        const post = await beehiivClient.getPostBySlug(slug)
        return beehiivPostToPost(post)
      } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch post')
      }
    },
    listPosts: async ({ first, after }) => {
      try {
        let posts = await beehiivClient.getPostList({ first, after })
        return {
          posts: posts.data?.map(post => beehiivPostToPost(post)) || [],
          limit: posts.limit || 0,
          page: posts.page || 0,
          totalCount: posts.total_results || 0,
          pageCount: posts.total_pages || 0,
        }
      } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch post list')
      }
    },
    createSubscriber: async input => {
      try {
        const subscriber = await beehiivClient.createSubscriber(input.email, {
          ...input,
          utmSource: input.utmSource || 'promopepper',
          utmMedium: input.utmMedium || 'api',
        })
        return subscriber
      } catch (error) {
        console.error(error)
        throw new Error('Failed to create subscriber')
      }
    },
  }
}

export { makeClient }
