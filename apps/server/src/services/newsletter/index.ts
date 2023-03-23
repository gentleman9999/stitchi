import * as beehiiv from '../../beehiiv'
import { Subscriber } from '../../beehiiv/serialize'
import { beehiivPostToPost } from './serializer'
import { Post, PostList } from './types'

interface NewsletterClientService {
  getPost: (slug: string) => Promise<Post>
  listPosts: () => Promise<PostList>
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
    listPosts: async () => {
      try {
        const posts = await beehiivClient.getPostList()
        return {
          posts: posts.data.map(post => beehiivPostToPost(post)),
          limit: posts.limit,
          page: posts.page,
          totalCount: posts.total_results,
          pageCount: posts.total_pages,
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
