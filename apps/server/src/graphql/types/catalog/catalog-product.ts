import { objectType } from 'nexus'

export const CatalogProductImage = objectType({
  name: 'CatalogProductImage',
  definition(t) {
    t.nonNull.string('url')
    t.nullable.int('order')

    t.nonNull.boolean('isDefault')
    t.nonNull.string('urlZoom')
    t.nonNull.string('urlStandard')
    t.nonNull.string('urlThumbnail')
    t.nonNull.string('urlTiny')
  },
})

export const CatalogProduct = objectType({
  name: 'CatalogProduct',
  definition(t) {
    t.nonNull.id('id')
    t.nullable.id('brandId')
    t.nonNull.list.nonNull.id('categoryIds')
    t.nonNull.list.nonNull.id('relatedProductIds')

    t.nonNull.string('slug')
    t.nonNull.string('name')
    t.nonNull.int('priceCents')
    t.nonNull.string('description')
    t.nonNull.boolean('visible')

    t.nullable.field('primaryImage', {
      type: 'CatalogProductImage',
    })

    t.nonNull.list.nonNull.field('images', {
      type: 'CatalogProductImage',
    })

    t.nonNull.DateTime('createdAt')
    t.nonNull.DateTime('updatedAt')
  },
})
