import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { Appearance, loadStripe } from '@stripe/stripe-js'
import getOrThrow from '@utils/get-or-throw'
import usePaymentIntent from '../../pages/OrderPayPage/usePaymentIntent'

const STRIPE_PUBLISHABLE_KEY = getOrThrow(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
)

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

interface Props {
  children: React.ReactNode
  clientSecret?: string | null
}

const StripeFormWrapper = (props: Props) => {
  const appearance: Appearance = {
    theme: 'flat',
  }

  return props.clientSecret ? (
    <Elements
      options={{ clientSecret: props.clientSecret, appearance }}
      stripe={stripePromise}
    >
      {props.children}
    </Elements>
  ) : null
}

export default StripeFormWrapper
