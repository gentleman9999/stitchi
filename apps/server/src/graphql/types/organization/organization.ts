import { objectType } from 'nexus'

export const Organization = objectType({
  name: 'Organization',
  definition: t => {
    t.nonNull.id('id')
    t.string('name')
    t.field('role', { type: 'GlobalRole' })

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.field('deletedAt', { type: 'DateTime' })
  },
})
