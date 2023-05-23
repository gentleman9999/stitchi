import { gql } from '@apollo/client'
import { Section } from '@components/common'
import { Container } from '@components/ui'
import { OrderDetailsPageOrderFragment } from '@generated/OrderDetailsPageOrderFragment'
import currency from 'currency.js'
import React from 'react'
import OrderDetailsPageBillingDetails from './OrderDetailsPageBillingDetails'
import OrderDetailsPageShippingDetails from './OrderDetailsPageShippingDetails'

interface Props {
  order: OrderDetailsPageOrderFragment
}

const OrderDetailsPage = ({ order }: Props) => {
  return (
    <Container>
      <Section>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Details</h1>

        <div className="flex flex-row gap-4 items-center">
          <span className="text-sm text-gray-500">
            Order <b className="text-gray-900">{order.humanOrderId}</b>
          </span>
          <span className="text-xs font-bold px-2 py-0.5 bg-primary text-gray-950/70 rounded-sm">
            {order.humanPaymentStatus}
          </span>
        </div>
      </Section>
      <hr className="mt-4" />
      <Section gutter="sm">
        <table className="w-full">
          <thead className="sr-only">
            <tr>
              <td>Name</td>
              <td>Quantity</td>
              <td>Unit Price</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            {order.items.map(item => {
              const [name, ...rest] = item.title.split(' - ')
              return (
                <tr key={item.id}>
                  <td className="py-2">
                    <span className="text-gray-900 font-bold">{name}</span>
                    {rest.length ? <> - {rest.join(' - ')}</> : null}
                  </td>
                  <td className="py-2 text-right">{item.quantity}</td>
                  <td className="py-2 text-right">
                    {currency(item.unitPriceCents, {
                      fromCents: true,
                    }).format()}
                  </td>
                  <td className="py-2 text-right">
                    {currency(item.totalPriceCents, {
                      fromCents: true,
                    }).format()}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Section>
      <Section gutter="sm">
        <OrderDetailsPageShippingDetails order={order} />
      </Section>
      <Section gutter="sm">
        <OrderDetailsPageBillingDetails order={order} />
      </Section>
    </Container>
  )
}

OrderDetailsPage.fragments = {
  order: gql`
    ${OrderDetailsPageBillingDetails.fragments.order}
    ${OrderDetailsPageShippingDetails.fragments.order}
    fragment OrderDetailsPageOrderFragment on Order {
      id
      humanOrderId
      customerFullName
      humanPaymentStatus
      totalTaxCents
      totalShippingCents
      subtotalPriceCents
      totalProcessingFeeCents
      totalPriceCents
      items {
        id
        quantity
        title
        unitPriceCents
        totalPriceCents
      }
      ...OrderDetailsPageBillingDetailsOrderFragment
      ...OrderDetailsPageShippingDetailsOrderFragment
    }
  `,
}

export default OrderDetailsPage
