import { enumType, objectType } from 'nexus'

export const NewsletterIssueStatus = enumType({
  name: 'NewsletterIssueStatus',
  members: ['DRAFT', 'CONFIRMED', 'ARCHIVED'],
})

export const NewsletterIssue = objectType({
  name: 'NewsletterIssue',
  definition: t => {
    t.nonNull.id('id')
    t.nonNull.string('slug')
    t.nonNull.string('subtitle')
    t.nonNull.string('title')
    t.nonNull.list.field('authorNames', { type: 'String' })
    t.nonNull.string('contentHtml')
    t.nonNull.DateTime('createdAt')
    t.nullable.DateTime('publishedAt')
    t.nullable.DateTime('displayAt')
    t.nullable.string('thumbnailUrl')
    t.nonNull.field('status', { type: 'NewsletterIssueStatus' })
  },
})
