import { gql } from '@apollo/client'
import { Section } from '@components/common'
import { Container } from '@components/ui'
import { OrderDetailsPageOrderFragment } from '@generated/OrderDetailsPageOrderFragment'
import React from 'react'
import { format, parseISO } from 'date-fns'
import OrderDetailsPageBillingDetails from './OrderDetailsPageBillingDetails'
import OrderDetailsPageShippingDetails from './OrderDetailsPageShippingDetails'
import OrderDetailsPageLineItems from './OrderDetailsPageLineItems'
import ContactUs from './ContactUs'
import OrderPaymentStatusBadge from '@components/common/OrderPaymentStatusBadge'

interface Props {
  order: OrderDetailsPageOrderFragment
}

const OrderDetailsPage = ({ order }: Props) => {
  return (
    <Container>
      <Section>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Details</h1>

        <div className="flex flex-col sm:flex-row sm:gap-4 sm:items-center">
          <span className="text-sm text-gray-500">
            Order number <b className="text-gray-900">{order.humanOrderId}</b>
          </span>
          <span className="sr-only sm:not-sr-only">·</span>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
            <span className="text-sm">
              <b>{format(parseISO(order.createdAt), 'PPP')}</b>
            </span>
            <span className="hidden sm:block">·</span>
            <div>
              <OrderPaymentStatusBadge
                size="small"
                humanStatus={order.humanPaymentStatus}
                status={order.paymentStatus}
              />
            </div>
          </div>
        </div>
      </Section>

      <div className="my-4" />

      <Section>
        <OrderDetailsPageShippingDetails order={order} />
      </Section>

      <hr className="my-4" />

      <Section gutter="sm">
        <OrderDetailsPageLineItems items={order.items} />
      </Section>

      <hr className="my-4" />

      <Section gutter="sm">
        <OrderDetailsPageBillingDetails order={order} />
      </Section>

      <Section gutter="md">
        <ContactUs humanOrderId={order.humanOrderId} />
      </Section>
    </Container>
  )
}

OrderDetailsPage.fragments = {
  order: gql`
    ${OrderDetailsPageBillingDetails.fragments.order}
    ${OrderDetailsPageShippingDetails.fragments.order}
    ${OrderDetailsPageLineItems.fragments.item}
    fragment OrderDetailsPageOrderFragment on Order {
      id
      createdAt
      humanOrderId
      paymentStatus
      humanPaymentStatus
      totalTaxCents
      totalShippingCents
      subtotalPriceCents
      totalProcessingFeeCents
      totalPriceCents
      items {
        id
        ...OrderDetailsPageLineItemsItemFragment
      }
      ...OrderDetailsPageBillingDetailsOrderFragment
      ...OrderDetailsPageShippingDetailsOrderFragment
    }
  `,
}

export default OrderDetailsPage
