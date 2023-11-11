import { objectType } from 'nexus'

export const DesignProductVariant = objectType({
  name: 'DesignProductVariant',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.id('catalogProductId')
    t.nonNull.id('catalogProductVariantId')
    t.nullable.id('catalogProductColorId')
    t.nullable.id('catalogProductSizeId')
    t.nullable.string('sizeName')
    t.nullable.string('colorName')
  },
})
