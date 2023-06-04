import express, { Router } from 'express'
import Stripe from 'stripe'
import makeStripeClient from '../../../stripe'
import { getOrThrow } from '../../../utils'
import services, { ServiceList } from '../../../services'

const webhookSecret = getOrThrow(
  process.env.STRIPE_WEBHOOK_SECRET,
  'STRIPE_WEBHOOK_SECRET',
)

interface Config {
  stripe: Stripe
  orderClient: ServiceList['order']
}

const makeRoutes = (
  { stripe, orderClient }: Config = {
    stripe: makeStripeClient(),
    orderClient: services.order,
  },
) => {
  const router = Router()

  router.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    async (req, res) => {
      let event
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          req.headers['stripe-signature'] as any,
          webhookSecret,
        )

        console.info(`Stripe webhook event: ${event.type}`, {
          context: { event },
        })
      } catch (error) {
        console.error(`Failed to construct Stripe event`, {
          context: { error },
        })
        return res.status(400).json()
      }

      if (event.type.startsWith('payment_intent')) {
        try {
          const orderId = (event.data.object as any)?.metadata?.orderId

          if (!orderId) {
            console.error('Payment intent is missing orderId', {
              context: { event },
            })

            throw new Error('Payment intent is missing orderId')
          }

          await orderClient.reconcileOrderPayments({ orderId })
        } catch (error) {
          console.error(`Failed to update payment intent`, {
            context: { error },
          })
        }
      }

      // Return a response to acknowledge receipt of the event
      res.json({ received: true })
    },
  )

  return router
}

export default makeRoutes
