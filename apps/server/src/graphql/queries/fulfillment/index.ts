import { GraphQLError } from 'graphql'
import { extendType } from 'nexus'
import { logger } from '../../../telemetry'
import { fulfillmentFactoryFulfillmentToGraphQL } from '../../serializers/fulfillment'

export const FulfillmentsExtendsOrder = extendType({
  type: 'Order',
  definition(t) {
    t.nonNull.list.nonNull.field('fulfillments', {
      type: 'Fulfillment',
      resolve: async (parent, _, ctx) => {
        let fulfillments

        try {
          fulfillments = await ctx.fulfillment.listFulfillments({
            filter: { orderId: parent.id },
          })
        } catch (error) {
          logger.error(`Error fetching fulfillments for order ${parent.id}`, {
            context: { error },
          })
          throw new GraphQLError('Failed to fetch order fulfillments')
        }

        return fulfillments.map(fulfillmentFactoryFulfillmentToGraphQL)
      },
    })
  },
})
