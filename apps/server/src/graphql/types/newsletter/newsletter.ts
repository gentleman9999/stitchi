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
