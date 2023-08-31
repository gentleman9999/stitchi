import express, { Router } from 'express'
import Stripe from 'stripe'
import makeStripeClient from '../../../stripe'
import { getOrThrow } from '../../../utils'
import services, { ServiceList } from '../../../services'
import { logger } from '../../../telemetry'

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

        logger
          .child({
            context: { event },
          })
          .info(`Stripe webhook event: ${event.type}`)
      } catch (error) {
        logger
          .child({
            context: { error },
          })
          .error(`Failed to construct Stripe event`)
        return res.status(400).json()
      }

      if (event.type.startsWith('charge')) {
        try {
          const orderId = (event.data.object as any)?.metadata?.orderId

          if (!orderId) {
            logger
              .child({
                context: { event },
              })
              .error('Charge is missing orderId')

            throw new Error('Charge is missing orderId')
          }

          await orderClient.reconcileOrderPayments({ orderId })
        } catch (error) {
          logger
            .child({
              context: { error },
            })
            .error(`Failed to update Charge`)
        }
      }

      // Return a response to acknowledge receipt of the event
      res.json({ received: true })
    },
  )

  return router
}

export default makeRoutes
