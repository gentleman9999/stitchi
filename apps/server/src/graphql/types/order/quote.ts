import { objectType } from 'nexus'

export const Quote = objectType({
  name: 'Quote',
  definition: t => {
    t.nonNull.id('id')
    t.nonNull.int('productTotalCostCents', {
      description: 'The cost of the product with shipping, taxes, and other.',
    })
    t.nonNull.int('productUnitCostCents', {
      description: 'The cost of the product without shipping, taxes, or other.',
    })
  },
})
