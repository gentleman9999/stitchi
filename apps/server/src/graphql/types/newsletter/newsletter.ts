import { inputObjectType, objectType } from 'nexus'

export const Newsletter = objectType({
  name: 'Newsletter',
  definition: t => {},
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
