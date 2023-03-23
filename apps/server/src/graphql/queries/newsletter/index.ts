import { extendType, queryField } from 'nexus'
import { nonNull } from 'nexus/dist/core'
import { Newsletter } from '../../types'

// const newsletterToGraphql = (
//   newsletter: any,
// ): ObjectDefinitionBlock<'Newsletter'> => {
//   return {}
// }

export const allNewsletterIssues = extendType({
  type: 'Newsletter',
  definition: t => {
    t.connectionField('allNewsletterIssues', {
      type: 'NewsletterIssue',
      resolve: async (_, { first, after, before, last }, ctx) => {
        return {
          nodes: (await ctx.newsletter.listPosts()).posts.map(post => ({
            id: post.id,
            slug: post.slug,
            title: post.title,
            subtitle: post.subtitle,
            thumbnailUrl: post.thumbnailUrl,
            authorNames: post.authors,
            createdAt: post.createdAt,
            contentHtml: post.bodyHtml,
            displayAt: post.displayedDate,
            publishedAt: post.publishDate,
            status: post.status as any,
          })),
          totalCount: 0,
        }
      },
    })

    t.nonNull.field('newsletterIssue', {
      type: 'NewsletterIssue',
      args: { slug: nonNull('String') },
      resolve: async (_, { slug }, ctx) => {
        const post = await ctx.newsletter.getPost(slug)
        return {
          id: post.id,
          slug: post.slug,
          title: post.title,
          subtitle: post.subtitle,
          thumbnailUrl: post.thumbnailUrl,
          authorNames: post.authors,
          createdAt: post.createdAt,
          contentHtml: post.bodyHtml,
          displayAt: post.displayedDate,
          publishedAt: post.publishDate,
          status: post.status as any,
        }
      },
    })
  },
})

export const newsletter = queryField('newsletter', {
  type: 'Newsletter',
  resolve: () => ({}),
})
