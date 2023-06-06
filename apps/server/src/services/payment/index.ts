import {
  paymentIntentFactory,
  PaymentIntentFactoryPaymentIntent,
  paymentMethodFactory,
  PaymentMethodFactoryPaymentMethod,
  refundFactory,
  RefundFactoryRefund,
} from './factory'
import { Stripe } from 'stripe'
import makeStripeClient from '../../stripe'

const orderIdMetadataKey = 'orderId'

export interface PaymentClientService {
  createPaymentIntent: (input: {
    orderId: string
    amountCents: number
  }) => Promise<PaymentIntentFactoryPaymentIntent>

  listPaymentIntents: (input: {
    orderId: string
    limit?: number
    filter?: {
      status?: Stripe.PaymentIntent.Status
    }
  }) => Promise<PaymentIntentFactoryPaymentIntent[]>

  getPaymentMethod: (input: {
    paymentMethodId: string
  }) => Promise<PaymentMethodFactoryPaymentMethod>

  listRefunds: (input: {
    paymentIntentId: string
  }) => Promise<RefundFactoryRefund[]>
}

interface MakeClientParams {
  stripe: Stripe
}

type MakeClientFn = (params?: MakeClientParams) => PaymentClientService

const makeClient: MakeClientFn = (
  { stripe } = {
    stripe: makeStripeClient(),
  },
) => {
  return {
    listPaymentIntents: async ({ limit = 100, orderId, filter }) => {
      let query = `metadata[\'${orderIdMetadataKey}\']:\'${orderId}\'`

      if (filter?.status) {
        query = `${query} AND status:\"${filter.status}\"`
      }

      let stripePaymentIntents

      try {
        stripePaymentIntents = await stripe.paymentIntents.search({
          limit,
          query,
        })
      } catch (error) {
        console.error(
          `Failed to list stripe payment intents for order ${orderId}`,
          {
            context: { error },
          },
        )
        throw new Error('Failed to list stripe payment intents')
      }

      return stripePaymentIntents.data.map(stripePaymentIntent =>
        paymentIntentFactory({ stripePaymentIntent }),
      )
    },
    createPaymentIntent: async ({ amountCents, orderId }) => {
      let stripePaymentIntent

      try {
        stripePaymentIntent = await stripe.paymentIntents.create({
          amount: amountCents,
          currency: 'usd',
          automatic_payment_methods: {
            enabled: true,
          },
          metadata: {
            [`${orderIdMetadataKey}`]: orderId,
          },
        })
      } catch (error) {
        console.error(
          `Failed to create stripe payment intent for order ${orderId}`,
          {
            context: { error },
          },
        )
        throw new Error('Failed to create stripe payment intent')
      }

      return paymentIntentFactory({ stripePaymentIntent })
    },
    getPaymentMethod: async ({ paymentMethodId }) => {
      let stripePaymentMethod

      try {
        stripePaymentMethod = await stripe.paymentMethods.retrieve(
          paymentMethodId,
        )
        stripePaymentMethod.type
      } catch (error) {
        console.error(
          `Failed to retrieve stripe payment method for payment intent ${paymentMethodId}`,
          {
            context: { error },
          },
        )
        throw new Error('Failed to retrieve stripe payment method')
      }

      return paymentMethodFactory({ stripePaymentMethod })
    },
    listRefunds: async ({ paymentIntentId }) => {
      let stripeRefunds

      try {
        stripeRefunds = await stripe.refunds.list({
          payment_intent: paymentIntentId,
        })
      } catch (error) {
        console.error(
          `Failed to list stripe refunds for payment intent ${paymentIntentId}`,
          {
            context: { error },
          },
        )
        throw new Error('Failed to list stripe refunds')
      }

      return stripeRefunds.data.map(stripeRefund =>
        refundFactory({ stripeRefund }),
      )
    },
  }
}

export { makeClient }
