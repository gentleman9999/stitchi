import { inputObjectType, objectType } from 'nexus'

export const Newsletter = objectType({
  name: 'Newsletter',
  definition: t => {
    t.nonNull.field('allNewsletterIssues', {
      type: 'NewsletterIssueConnection',
      args: { filter: 'AllNewsletterIssuesFilter' },
      resolve: async (_, { filter }, ctx) => {
        throw new Error('Not implemented yet.')
        // return ctx.newsletter.listPosts()
      },
    })
  },
})

export const AllNewsletterIssuesFilter = inputObjectType({
  name: 'AllNewsletterIssuesFilter',
  definition: t => {
    t.nonNull.int('first')
    t.int('skip')
  },
})

export const NewsletterIssueConnection = objectType({
  name: 'NewsletterIssueConnection',
  definition: t => {
    t.nonNull.list.field('nodes', { type: 'NewsletterIssue' })
    t.nonNull.int('totalCount')
  },
})
