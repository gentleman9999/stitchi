import { objectType } from 'nexus'

export const Vendor = objectType({
  name: 'Vendor',
  definition: t => {
    t.nonNull.id('id')

    t.nonNull.string('name')

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})
