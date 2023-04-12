import { objectType } from 'nexus'

export const PrintLocation = objectType({
  name: 'PrintLocation',
  definition: t => {
    t.nonNull.int('colorCount')
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
    t.nonNull.float('totalCostInCents')
  },
})
