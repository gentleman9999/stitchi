import { gql } from '@apollo/client'
import { Section } from '@components/common'
import StripeFormWrapper from '@components/common/StripeFormWrapper'
import { Container } from '@components/ui'
import { OrderPayPageOrderFragment } from '@generated/OrderPayPageOrderFragment'
import React from 'react'
import OrderPaymentForm from './OrderPaymentForm'
import usePaymentIntent from './usePaymentIntent'

interface Props {
  order: OrderPayPageOrderFragment
}

const OrderPayPage = ({ order }: Props) => {
  const paymentIntent = usePaymentIntent({ orderId: order.id })

  return (
    <Container>
      <Section>
        <h1></h1>
      </Section>
      <Section>
        <div className="grid grid-cols-2">
          <StripeFormWrapper clientSecret={paymentIntent?.clientSecret}>
            <OrderPaymentForm amountCents={paymentIntent?.amount || 0} />
          </StripeFormWrapper>
        </div>
      </Section>
    </Container>
  )
}

OrderPayPage.fragments = {
  order: gql`
    fragment OrderPayPageOrderFragment on Order {
      id
      totalTaxCents
      totalPriceCents
      totalShippingCents
      subtotalPriceCents
      totalProcessingFeeCents
    }
  `,
}

export default OrderPayPage
