import { GraphQLError } from 'graphql'
import { inputObjectType, objectType } from 'nexus'
import calculate from '../../../services/quote/calculateQuote'

export const QuoteGeneratePrintLocationInput = inputObjectType({
  name: 'QuoteGeneratePrintLocationInput',
  definition(t) {
    t.nonNull.int('colorCount')
  },
})

export const Product = objectType({
  name: 'Product',
  definition: t => {
    t.nonNull.id('id')
    t.nonNull.int('priceCents', {
      resolve: async (parent, _, ctx) => {
        try {
          const { productUnitCostCents } = calculate({
            productPriceCents: (parent as any).prices.price.value * 100,
            includeFulfillment: false,
            quantity: 10_000,
            printLocations: [{ colorCount: 1 }],
          })

          return productUnitCostCents
        } catch (error) {
          ctx.logger
            .child({
              context: {
                error,
              },
            })
            .error("Error calculating product's price")

          throw new GraphQLError(
            `Unable to calculate product's price: ${parent.id}`,
          )
        }
      },
    })
  },
})
