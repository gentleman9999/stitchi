import { objectType } from 'nexus'

export const ProductPriceMetadata = objectType({
  name: 'ProductPriceMetadata',
  definition(t) {
    t.nonNull.int('minPriceCents')
    t.nonNull.int('maxPriceCents')
  },
})
