import { objectType } from 'nexus'

export const Manufacturer = objectType({
  name: 'Manufacturer',
  definition: t => {
    t.nonNull.id('id')

    t.nonNull.string('name')

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})
