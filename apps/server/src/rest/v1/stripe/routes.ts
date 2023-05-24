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
  paymentClient: ServiceList['payment']
}

const makeRoutes = (
  { stripe, paymentClient }: Config = {
    stripe: makeStripeClient(),
    paymentClient: services.payment,
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
          await paymentClient.updatePaymentIntent({
            stripePaymentIntentId: (event.data.object as any)?.id,
          })
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
