import { extendType } from 'nexus'
import { paymentIntentFactoryPaymentIntentToGraphQL } from '../../serializers/payment'

export const ExtendOrderWithPaymentItents = extendType({
  type: 'Order',
  definition: t => {
    t.nonNull.list.nonNull.field('paymentIntents', {
      type: 'PaymentIntent',
      resolve: async (order, _, ctx) => {
        const paymentIntents = await ctx.payment.listPaymentIntents({
          orderId: order.id,
        })

        return paymentIntents.map(paymentIntentFactoryPaymentIntentToGraphQL)
      },
    })
  },
})

export const ExtendOrderWithLastPaymentMethod = extendType({
  type: 'Order',
  definition: t => {
    t.field('lastPaymentMethod', {
      type: 'PaymentMethod',
      resolve: async (order, _, ctx) => {
        let lastSuccessfulPaymentIntent

        try {
          const [lastIntent] = await ctx.payment.listPaymentIntents({
            limit: 1,
            orderId: order.id,
            filter: {
              status: 'succeeded',
            },
          })

          lastSuccessfulPaymentIntent = lastIntent
        } catch (error) {
          console.error(
            `Error fetching payment intents for order ${order.id}`,
            {
              context: { error },
            },
          )
        }

        if (!lastSuccessfulPaymentIntent?.paymentMethodId) {
          return null
        }

        let paymentMethod

        try {
          paymentMethod = await ctx.payment.getPaymentMethod({
            paymentMethodId: lastSuccessfulPaymentIntent.paymentMethodId,
          })
        } catch (error) {
          console.error(
            `Error fetching payment method for payment intent ${lastSuccessfulPaymentIntent.id}`,
            {
              context: { error },
            },
          )

          return null
        }

        return paymentMethod
      },
    })
  },
})
