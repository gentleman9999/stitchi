import { extendType, objectType } from 'nexus'

export const PrintLocation = objectType({
  name: 'PrintLocation',
  definition: t => {
    t.nonNull.int('colorCount')
    t.int('totalCostInCents')
  },
})

export const Quote = objectType({
  name: 'Quote',
  definition: t => {
    t.nonNull.id('id')
    t.nonNull.int('printLocationCount')
    t.nonNull.list.nonNull.field('printLocations', {
      type: 'PrintLocation',
    })
    t.nonNull.int('productTotalCostCents', {
      description: 'The cost of the product with shipping, taxes, and other.',
    })
    t.nonNull.int('productUnitCostCents', {
      description: 'The cost of the product without shipping, taxes, or other.',
    })
  },
})
