import { objectType } from 'nexus'

export const CatalogBrand = objectType({
  name: 'CatalogBrand',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
    t.nonNull.string('slug')
  },
})
