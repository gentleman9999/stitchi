import { objectType } from 'nexus'

export const Product = objectType({
  name: 'Product',
  definition: t => {
    t.nonNull.id('id')
  },
})
