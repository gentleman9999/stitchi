import { getOrThrow } from '../utils'
import { Stripe } from 'stripe'

const STRIPE_PUBLISHABLE_KEY = getOrThrow(
  process.env.STRIPE_PUBLISHABLE_KEY,
  'STRIPE_PUBLISHABLE_KEY',
)

const makeStripeClient = (
  config: Stripe.StripeConfig = { apiVersion: '2022-11-15' },
) => {
  return new Stripe(STRIPE_PUBLISHABLE_KEY, {
    ...config,
  })
}

export default makeStripeClient
