import { GraphQLError } from 'graphql'
import { extendType, idArg, list, nonNull, queryField } from 'nexus'
import * as uuid from 'uuid'
import { orderFactoryOrderToGraphQL } from '../../serializers/order'

export const order = queryField('order', {
  type: 'Order',
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_, { id }, { order }) => {
    return orderFactoryOrderToGraphQL(await order.getOrder({ orderId: id }))
  },
})

export const ProductAddQuote = extendType({
  type: 'Product',
  definition(t) {
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
        context,
      ) => {
        try {
          const data = await context.quote.generateQuote({
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
