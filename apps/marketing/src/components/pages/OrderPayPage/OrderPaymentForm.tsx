import { ApolloError } from '@apollo/client'
import { Button } from '@components/ui'
import routes from '@lib/routes'
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js'
import {
  StripeAddressElementChangeEvent,
  StripeLinkAuthenticationElementChangeEvent,
  StripePaymentElementOptions,
} from '@stripe/stripe-js'
import makeAbsoluteUrl from '@utils/get-absolute-url'
import currency from 'currency.js'
import Link from 'next/link'
import React from 'react'
import useConfirmOrder from './useConfirmOrder'

interface Props {
  amountCents: number
  orderId: string
  renderOrderPreview: () => React.ReactNode
}

const OrderPaymentForm = (props: Props) => {
  const stripe = useStripe()
  const elements = useElements()
  const [confirmOrder] = useConfirmOrder({ orderId: props.orderId })

  const [authenticationVals, setAuthenticationVals] =
    React.useState<StripeLinkAuthenticationElementChangeEvent['value']>()

  const [shippingAddressValues, setShippingAddressValues] =
    React.useState<StripeAddressElementChangeEvent['value']>()

  const [message, setMessage] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret',
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!')
          break
        case 'processing':
          setMessage('Your payment is processing.')
          break
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.')
          break
        default:
          setMessage('Something went wrong.')
          break
      }
    })
  }, [stripe])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    if (!authenticationVals || !shippingAddressValues) {
      setMessage('Please fill out all required fields.')
      return
    }

    setIsLoading(true)

    try {
      await confirmOrder({
        customerEmail: authenticationVals?.email,
        customerFirstName: shippingAddressValues?.firstName || '',
        customerLastName: shippingAddressValues?.lastName || '',
        customerPhone: shippingAddressValues?.phone || '',
        shippingAddress: {
          firstName: shippingAddressValues?.firstName,
          lastName: shippingAddressValues?.lastName,
          phone: shippingAddressValues?.phone,
          address1: shippingAddressValues?.address.line1,
          address2: shippingAddressValues?.address.line2,
          city: shippingAddressValues?.address.city,
          country: shippingAddressValues?.address.country,
          zip: shippingAddressValues?.address.postal_code,
          province: shippingAddressValues?.address.state,
        },
      })
    } catch (error) {
      console.error(`Error confirming order: ${props.orderId}`, {
        context: { error, authenticationVals, shippingAddressValues },
      })

      if (error instanceof ApolloError) {
        setMessage(error.message)
      } else {
        setMessage('An unexpected error occurred.')
      }

      setIsLoading(false)
      return
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: makeAbsoluteUrl(
          routes.internal.order.show.href({ orderId: props.orderId }),
        ),
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error && error.type !== 'validation_error') {
      // Validatoin errors are handled by the Stripe Elements
      setMessage(error.message || 'An unexpected error occurred.')
      setIsLoading(false)
      return
    }

    setIsLoading(false)
  }

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'accordion',
      defaultCollapsed: true,
      radios: true,
      spacedAccordionItems: false,
    },
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        <div className="flex flex-col gap-10">
          <div>
            <SectionTitle>Contact</SectionTitle>
            <LinkAuthenticationElement
              onChange={({ value }) => setAuthenticationVals(value)}
            />
          </div>

          <div>
            <SectionTitle>Shipping details</SectionTitle>
            <AddressElement
              onChange={({ value }) => setShippingAddressValues(value)}
              options={{
                mode: 'shipping',
                allowedCountries: ['US'],
                display: { name: 'split' },
                blockPoBox: true,
                validation: {
                  phone: {
                    required: 'always',
                  },
                },
                fields: {
                  phone: 'always',
                },
              }}
            />
          </div>

          <div>
            <SectionTitle>Payment details</SectionTitle>
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
            />
          </div>
        </div>
        {/* Need this <div /> for sticky positioning to work properly */}
        <div>
          <div className="sm:sticky sm:top-20 flex flex-col gap-4">
            {props.renderOrderPreview()}

            <div className="text-xs text-gray-500">
              By submitting this order you acknowledge that you have read and
              accept Stitchi{' '}
              <Link
                href={routes.internal.legal.privacy.href()}
                className="underline"
              >
                Privacy Policy
              </Link>
              , including that Stitchi may email and SMS you about the service
              it provides.
            </div>
            <div className="flex justify-end">
              <Button
                color="brandPrimary"
                className="w-full"
                loading={isLoading}
              >
                Pay ({currency(props.amountCents, { fromCents: true }).format()}
                )
              </Button>
            </div>

            {/* Show any error or success messages */}
            {message && (
              <div id="payment-message" className="text-red-600">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-heading mb-2 text-gray-900">
    {children}
  </h2>
)

export default OrderPaymentForm