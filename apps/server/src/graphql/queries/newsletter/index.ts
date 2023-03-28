import { extendType, queryField } from 'nexus'
import { nonNull } from 'nexus/dist/core'
import { notEmpty } from '../../../utils'

export const allNewsletterIssues = extendType({
  type: 'Newsletter',
  definition: t => {
    t.connectionField('allNewsletterIssues', {
      type: 'NewsletterIssue',
      disableBackwardPagination: true,
      resolve: async (_, { first, after }, ctx) => {
        const postList = await ctx.newsletter.listPosts({
          first: notEmpty(first) ? first : undefined,
          after: notEmpty(after) ? after : undefined,
        })

        return {
          nodes: postList.posts.map(post => ({
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
          totalCount: postList.totalCount,
          pageInfo: {
            hasNextPage: postList.page < postList.pageCount - 1,
            hasPreviousPage: postList.page > 0,
            endCursor: postList.page.toString(),
            startCursor: postList.page.toString(),
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
