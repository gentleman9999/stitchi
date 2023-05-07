import { GraphQLError } from 'graphql'
import { inputObjectType, list, nonNull, objectType } from 'nexus'
import calculate from './calculateQuote'
import * as uuid from 'uuid'

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
      resolve: async parent => {
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
    t.nonNull.field('quote', {
      type: 'Quote',
      args: {
        quantity: nonNull('Int'),
        printLocations: nonNull(
          list(nonNull('QuoteGeneratePrintLocationInput')),
        ),
        includeFulfillment: 'Boolean',
      },
      resolve: async (
        parent,
        { includeFulfillment, printLocations, quantity },
      ) => {
        try {
          const data = await calculate({
            includeFulfillment: Boolean(includeFulfillment),
            printLocations,
            quantity,
            productPriceCents: (parent as any).prices.price.value * 100,
          })

          return {
            id: uuid.v4(),
            ...data,
          }
        } catch (error) {
          console.error(error)
          throw new GraphQLError(
            `Unable to get quote for product: ${parent.id}`,
          )
        }
      },
    })
  },
})
