import { objectType } from 'nexus'

export const PageInfo = objectType({
  name: 'PageInfo',
  definition: t => {
    t.nonNull.boolean('hasNextPage')
    t.string('endCursor')
  },
})
