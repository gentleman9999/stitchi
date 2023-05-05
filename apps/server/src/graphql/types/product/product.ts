import { GraphQLError } from 'graphql'
import { objectType } from 'nexus'
import calculate from './calculateQuote'

export const Product = objectType({
  name: 'Product',
  definition: t => {
    t.nonNull.id('id')
    t.nonNull.int('priceCents', {
      resolve: async (parent, args) => {
        try {
          const { productUnitCostCents } = await calculate({
            productPriceCents: (parent as any).prices.price.value * 100,
            includeFulfillment: false,
            quantity: 10_000,
            printLocations: [{ colorCount: 1 }],
          })

          return productUnitCostCents
        } catch (error) {
          console.error("Error calculating product's price", {
            context: {
              error,
            },
          })

          throw new GraphQLError(
            `Unable to calculate product's price: ${parent.id}`,
          )
        }
      },
    })
  },
})
