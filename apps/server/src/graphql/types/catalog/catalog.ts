import { objectType } from 'nexus'

export const Catalog = objectType({
  name: 'Catalog',
  definition: t => {
    t.nonNull.id('id')

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})
