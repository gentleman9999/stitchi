import { inputObjectType, list, nonNull, queryField } from 'nexus'
import { GraphQLError } from 'graphql'
import * as uuid from 'uuid'
import calculate from '../../types/product/calculateQuote'

export const QuoteGeneratePrintLocationInput = inputObjectType({
  name: 'QuoteGeneratePrintLocationInput',
  definition(t) {
    t.nonNull.int('colorCount')
  },
})

export const quoteGenerate = queryField('quoteGenerate', {
  description: 'Generates a quote',
  type: 'Quote',
  args: {
    catalogProductVariantId: nonNull('Int'),
    quantity: nonNull('Int'),
    printLocations: nonNull(list(nonNull('QuoteGeneratePrintLocationInput'))),
    includeFulfillment: 'Boolean',
  },
  resolve: async (
    _,
    { catalogProductVariantId, printLocations, quantity, includeFulfillment },
    ctx,
  ) => {
    try {
      const productPriceDecimal = await ctx.catalog.getProductPrice(
        catalogProductVariantId,
      )

      const productPrice = Math.floor(productPriceDecimal * 100)

      const data = await calculate({
        includeFulfillment: Boolean(includeFulfillment),
        printLocations,
        quantity,
        productPriceCents: productPrice,
      })

      return {
        id: uuid.v4(),
        ...data,
      }
    } catch (error) {
      console.error(error)
      throw new GraphQLError(
        `Unable to get product price: ${catalogProductVariantId}`,
      )
    }
  },
})
