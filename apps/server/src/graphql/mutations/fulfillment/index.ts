import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { fulfillmentFactoryFulfillmentToGraphQL } from '../../serializers/fulfillment'

export const FulfillmentCreatePayload = objectType({
  name: 'FulfillmentCreatePayload',
  definition(t) {
    t.field('fulfillment', {
      type: 'Fulfillment',
    })
  },
})

export const FulfillmentCreateInput = inputObjectType({
  name: 'FulfillmentCreateInput',
  definition(t) {
    t.nonNull.string('orderId')
    t.nonNull.string('trackingNumber')
    t.nonNull.string('trackingUrl')
    t.nonNull.string('carrier')
  },
})

export const fulfillmentCreate = mutationField('fulfillmentCreate', {
  type: 'FulfillmentCreatePayload',
  args: {
    input: nonNull('FulfillmentCreateInput'),
  },
  resolve: async (_, { input }, ctx) => {
    let order

    try {
      order = await ctx.order.getOrder({ orderId: input.orderId })
    } catch (error) {
      console.error(`Failed to get order`, {
        context: { error },
      })
      throw new GraphQLError('Failed to get order')
    }

    let fulfillment

    try {
      fulfillment = await ctx.fulfillment.createFulfillment({
        fulfillment: {
          orderId: input.orderId,
          userId: order.userId,
          organizationId: order.organizationId,
          fulfillmentTrackingInfo: {
            trackingNumber: input.trackingNumber,
            trackingUrl: input.trackingUrl,
            carrier: input.carrier,
          },
          fulfillmentOrderItems: [],
        },
      })
    } catch (error) {
      console.error(`Failed to create fulfillment`, {
        context: { error },
      })
      throw new GraphQLError('Failed to create fulfillment')
    }

    return {
      fulfillment: fulfillmentFactoryFulfillmentToGraphQL(fulfillment),
    }
  },
})
