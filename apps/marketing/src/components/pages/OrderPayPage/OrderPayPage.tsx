import { gql } from '@apollo/client'
import { Section } from '@components/common'
import StripeFormWrapper from '@components/common/StripeFormWrapper'
import Container from '@components/ui/Container'
import { OrderPayPageOrderFragment } from '@generated/OrderPayPageOrderFragment'
import { OrderPayPagePaymentIntentFragment } from '@generated/OrderPayPagePaymentIntentFragment'
import { NextSeo } from 'next-seo'
import React from 'react'
import OrderPaymentForm from './OrderPaymentForm'
import OrderPayPageOrderPreview from './OrderPayPageOrderPreview'

interface Props {
  order: OrderPayPageOrderFragment
  paymentIntent: OrderPayPagePaymentIntentFragment
}

const OrderPayPage = ({ order, paymentIntent }: Props) => {
  return (
    <>
      <NextSeo nofollow noindex />
      <div className="bg-gray-50">
        <Container>
          <h1 className="sr-only">Checkout</h1>
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
      </div>
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
