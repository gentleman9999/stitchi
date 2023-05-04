import { objectType } from 'nexus'

export const Product = objectType({
  name: 'Product',

  definition: t => {
    t.nonNull.id('id')
    t.nonNull.int('priceCents', {
      resolve: async (parent, _, ctx) => {
        console.log('PARENT', parent)
        return 0
      },
    })
  },
})
