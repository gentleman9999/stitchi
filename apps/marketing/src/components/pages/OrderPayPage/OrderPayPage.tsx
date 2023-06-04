import { gql } from '@apollo/client'
import { Section } from '@components/common'
import StripeFormWrapper from '@components/common/StripeFormWrapper'
import { Container } from '@components/ui'
import { OrderPayPageOrderFragment } from '@generated/OrderPayPageOrderFragment'
import { OrderPayPagePaymentIntentFragment } from '@generated/OrderPayPagePaymentIntentFragment'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'
import OrderPaymentForm from './OrderPaymentForm'
import OrderPayPageOrderPreview from './OrderPayPageOrderPreview'

interface Props {
  order: OrderPayPageOrderFragment
  paymentIntent: OrderPayPagePaymentIntentFragment
}

const OrderPayPage = ({ order, paymentIntent }: Props) => {
  const router = useRouter()

  return (
    <>
      <NextSeo nofollow noindex />
      <Container>
        <div className="h-8" />
        <Section>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-semibold font-heading">Checkout</h1>
            <button onClick={() => router.back()} className="underline">
              Return to previous page
            </button>
          </div>
        </Section>
        <Section gutter="md">
          {paymentIntent.clientSecret ? (
            <StripeFormWrapper clientSecret={paymentIntent.clientSecret}>
              <OrderPaymentForm
                amountCents={paymentIntent?.amount || 0}
                orderId={order.id}
                renderOrderPreview={() => (
                  <OrderPayPageOrderPreview order={order} />
                )}
              />
            </StripeFormWrapper>
          ) : (
            <div className="text-red-600 p-2">
              Failed to load payment form. Please contact support.
            </div>
          )}
        </Section>
      </Container>
    </>
  )
}

OrderPayPage.fragments = {
  paymentIntent: gql`
    fragment OrderPayPagePaymentIntentFragment on PaymentIntent {
      id
      clientSecret
      amount
    }
  `,
  order: gql`
    ${OrderPayPageOrderPreview.fragments.order}
    fragment OrderPayPageOrderFragment on Order {
      id
      totalTaxCents
      totalPriceCents
      totalShippingCents
      subtotalPriceCents
      totalProcessingFeeCents
      ...OrderPayPageOrderPreviewItemFragment
    }
  `,
}

export default OrderPayPage
