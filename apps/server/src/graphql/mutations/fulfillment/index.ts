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
    if (!ctx.membershipId) {
      throw new GraphQLError('Unauthorized')
    }

    let order

    try {
      order = await ctx.order.getOrder({ orderId: input.orderId })
    } catch (error) {
      ctx.logger.child({ context: { error } }).error(`Failed to get order`)
      throw new GraphQLError('Failed to get order')
    }

    let fulfillment

    try {
      fulfillment = await ctx.fulfillment.createFulfillment({
        fulfillment: {
          orderId: input.orderId,
          membershipId: ctx.membershipId,
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
      ctx.logger
        .child({ context: { error } })
        .error(`Failed to create fulfillment`)
      throw new GraphQLError('Failed to create fulfillment')
    }

    return {
      fulfillment: fulfillmentFactoryFulfillmentToGraphQL(fulfillment),
    }
  },
})
