import { extendType, queryField } from 'nexus'
import { nonNull } from 'nexus/dist/core'

export const allNewsletterIssues = extendType({
  type: 'Newsletter',
  definition: t => {
    t.connectionField('allNewsletterIssues', {
      type: 'NewsletterIssue',
      disableBackwardPagination: true,
      resolve: async (_, { first, after }, ctx) => {
        const postList = await ctx.newsletter.listPosts({
          // Hack to get around broken beehiiv pagination
          first: 100,
          // first: notEmpty(first) ? first : undefined,
          // after: notEmpty(after) ? after : undefined,
        })

        const afterInt = after ? parseInt(after, 10) : 0
        const limit = first ?? postList.posts.length

        let posts = postList.posts.reverse()
        posts = posts.slice(afterInt, afterInt + limit)

        return {
          // TODO: Update to properly sort once Beehiiv supports sorting
          edges: posts.map(post => ({
            cursor: '',
            node: {
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
            },
          })),
          pageInfo: {
            hasNextPage: afterInt < postList.posts.length - 1,
            endCursor: `${afterInt + limit}`,
          },
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
