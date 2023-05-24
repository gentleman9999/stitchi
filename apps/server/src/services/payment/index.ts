import {
  paymentIntentFactory,
  PaymentIntentFactoryPaymentIntent,
} from './factory'
import makePaymentIntentRepository, {
  PaymentIntentRepository,
} from './repository'
import { Stripe } from 'stripe'
import makeStripeClient from '../../stripe'
import { stripePaymentStatusToRecord } from './helpers/stripe-payment-status-to-record'

export interface PaymentIntentClientService {
  createPaymentIntent: (input: {
    orderId: string
    amountCents: number
  }) => Promise<PaymentIntentFactoryPaymentIntent>
  updatePaymentIntent: (input: {
    id?: string
    stripePaymentIntentId?: string
  }) => Promise<PaymentIntentFactoryPaymentIntent>
  listPaymentIntents: PaymentIntentRepository['listPaymentIntents']
}

interface MakeClientParams {
  stripe: Stripe
  paymentIntentRepository: PaymentIntentRepository
}

type MakeClientFn = (params?: MakeClientParams) => PaymentIntentClientService

const makeClient: MakeClientFn = (
  { paymentIntentRepository, stripe } = {
    paymentIntentRepository: makePaymentIntentRepository(),
    stripe: makeStripeClient(),
  },
) => {
  return {
    listPaymentIntents: paymentIntentRepository.listPaymentIntents,
    createPaymentIntent: async ({ amountCents, orderId }) => {
      let stripePaymentIntent

      try {
        stripePaymentIntent = await stripe.paymentIntents.create({
          amount: amountCents,
          currency: 'usd',
          automatic_payment_methods: {
            enabled: true,
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

      let paymentIntentRecord

      try {
        paymentIntentRecord = await paymentIntentRepository.createPaymentIntent(
          {
            amount: amountCents,
            orderId,
            stripePaymentIntentClientSecret: stripePaymentIntent.client_secret,
            stripePaymentIntentId: stripePaymentIntent.id,
            stripePaymentIntentStatus: stripePaymentStatusToRecord(
              stripePaymentIntent.status,
            ),
          },
        )
      } catch (error) {
        console.error(`Failed to create payment intent for order ${orderId}`, {
          context: { error },
        })
        throw new Error('Failed to create payment intent')
      }

      return paymentIntentFactory({
        paymentIntentRecord,
      })
    },
    updatePaymentIntent: async ({ id, stripePaymentIntentId }) => {
      const logId = id || stripePaymentIntentId

      if (!id && !stripePaymentIntentId) {
        throw new Error('Must provide either id or stripePaymentIntentId')
      }

      let paymentIntentRecordToUpdate

      try {
        paymentIntentRecordToUpdate =
          await paymentIntentRepository.getPaymentIntent({
            id,
            stripePaymentIntentId,
          })
      } catch (error) {
        console.error(`Failed to get payment intent for id ${logId}`, {
          context: { error },
        })
        throw new Error('Failed to get payment intent')
      }

      // Get the latest payment intent from Stripe

      let stripePaymentIntent

      try {
        stripePaymentIntent = await stripe.paymentIntents.retrieve(
          paymentIntentRecordToUpdate.stripePaymentIntentId,
        )
      } catch (error) {
        console.error(
          `Failed to retrieve stripe payment intent for id ${logId}`,
          {
            context: { error },
          },
        )
        throw new Error('Failed to retrieve stripe payment intent')
      }

      // Update the payment intent record

      let paymentIntentRecord

      try {
        paymentIntentRecord = await paymentIntentRepository.updatePaymentIntent(
          {
            id: paymentIntentRecordToUpdate.id,
            amount: stripePaymentIntent.amount,
            orderId: paymentIntentRecordToUpdate.orderId,
            stripePaymentIntentClientSecret: stripePaymentIntent.client_secret,
            stripePaymentIntentStatus: stripePaymentStatusToRecord(
              stripePaymentIntent.status,
            ),
          },
        )
      } catch (error) {
        console.error(`Failed to update payment intent for id ${logId}`, {
          context: { error },
        })
        throw new Error('Failed to update payment intent')
      }

      return paymentIntentFactory({
        paymentIntentRecord,
      })
    },
  }
}

export { makeClient }
