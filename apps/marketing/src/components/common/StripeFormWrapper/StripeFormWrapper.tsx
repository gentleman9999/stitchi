import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { Appearance, loadStripe } from '@stripe/stripe-js'
import getOrThrow from '@utils/get-or-throw'
import { theme } from '../../../../tailwind.config'

const STRIPE_PUBLISHABLE_KEY = getOrThrow(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
)

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

interface Props {
  children: React.ReactNode
  clientSecret: string
}

const StripeFormWrapper = (props: Props) => {
  const appearance: Appearance = {
    theme: 'stripe',
    labels: 'floating',
    variables: {
      fontFamily: ' Inter, sans-serif',
      fontLineHeight: '1.5',
      borderRadius: '4px',
      colorBackground: theme.colors.paper,
      colorPrimaryText: '#262626',
    },
    rules: {
      '.Block': {
        backgroundColor: 'var(--colorBackground)',
        boxShadow: 'none',
        padding: '12px',
      },
      '.Input': {
        padding: '12px',
      },
      '.Input:disabled, .Input--invalid:disabled': {
        color: 'lightgray',
      },
      '.Tab': {
        padding: '10px 12px 8px 12px',
        border: 'none',
      },
      '.Tab:hover': {
        border: 'none',
        boxShadow:
          '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)',
      },
      '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
        border: 'none',
        backgroundColor: '#fff',
        boxShadow:
          '0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)',
      },
      '.Label': {
        fontWeight: '500',
      },
    },
  }

  return (
    <Elements
      options={{
        appearance,
        clientSecret: props.clientSecret,
      }}
      stripe={stripePromise}
    >
      {props.children}
    </Elements>
  )
}

export default StripeFormWrapper
