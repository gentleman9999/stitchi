import { objectType } from 'nexus'

export const CatalogCategory = objectType({
  name: 'CatalogCategory',
  definition(t) {
    t.nonNull.id('bigCommerceEntityId')

    t.nonNull.string('name')
    t.nullable.string('description')

    t.nullable.field('subcategories', {
      type: 'CatalogCategory',
    })
  },
})
