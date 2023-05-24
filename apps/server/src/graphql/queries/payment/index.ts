import { extendType } from 'nexus'
import { paymentIntentFactoryPaymentIntentToGraphQL } from '../../serializers/payment'

export const ExtendOrderWithPaymentItents = extendType({
  type: 'Order',
  definition: t => {
    t.nonNull.list.nonNull.field('paymentIntents', {
      type: 'PaymentIntent',
      resolve: async (order, _, ctx) => {
        const paymentIntents = await ctx.payment.listPaymentIntents({
          filter: {
            where: {
              orderId: {
                equals: order.id,
              },
            },
          },
        })

        return paymentIntents.map(paymentIntentFactoryPaymentIntentToGraphQL)
      },
    })
  },
})
