import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { paymentIntentFactoryPaymentIntentToGraphQL } from '../../serializers/payment'

export const PaymentIntentCreatePayload = objectType({
  name: 'PaymentIntentCreatePayload',
  definition(t) {
    t.field('paymentIntent', {
      type: 'PaymentIntent',
    })
  },
})

export const PaymentIntentCreateInput = inputObjectType({
  name: 'PaymentIntentCreateInput',
  definition(t) {
    t.nonNull.string('orderId')
  },
})

export const paymentIntentCreate = mutationField('paymentIntentCreate', {
  type: 'PaymentIntentCreatePayload',
  args: {
    input: nonNull('PaymentIntentCreateInput'),
  },
  async resolve(_, { input }, ctx) {
    let order

    try {
      order = await ctx.order.getOrder(
        { orderId: input.orderId },
        {
          actor: ctx,
        },
      )
    } catch (error) {
      ctx.logger
        .child({
          context: { error },
        })
        .error(`Error fetching order: ${input.orderId}`)
      throw new GraphQLError('Error fetching order')
    }

    if (order.totalAmountDueCents <= 0) {
      return null
    }

    let paymentIntent

    try {
      paymentIntent = await ctx.payment.createPaymentIntent({
        orderId: input.orderId,
        amountCents: order.totalAmountDueCents,
      })
    } catch (error) {
      ctx.logger
        .child({
          context: { error },
        })
        .error(`Error creating payment intent for order: ${input.orderId}`)
      throw new GraphQLError('Error creating payment intent')
    }

    return {
      paymentIntent: paymentIntentFactoryPaymentIntentToGraphQL(paymentIntent),
    }
  },
})
