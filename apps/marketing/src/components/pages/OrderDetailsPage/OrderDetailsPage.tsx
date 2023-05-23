import { gql } from '@apollo/client'
import { Section } from '@components/common'
import { Container } from '@components/ui'
import { OrderDetailsPageOrderFragment } from '@generated/OrderDetailsPageOrderFragment'
import currency from 'currency.js'
import React from 'react'

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
          <tfoot className="border-t">
            <tr>
              <td className="py-2 text-right" colSpan={3}>
                Subtotal
              </td>
              <td className="py-2 text-right">
                {currency(order.subtotalPriceCents, {
                  fromCents: true,
                }).format()}
              </td>
            </tr>
            <tr>
              <td className="py-2 text-right" colSpan={3}>
                Shipping
              </td>
              <td className="py-2 text-right">
                {currency(order.totalShippingCents, {
                  fromCents: true,
                }).format()}
              </td>
            </tr>
            <tr>
              <td className="py-2 text-right" colSpan={3}>
                Tax
              </td>
              <td className="py-2 text-right">
                {currency(order.totalTaxCents, {
                  fromCents: true,
                }).format()}
              </td>
            </tr>
            <tr>
              <td className="py-2 text-right" colSpan={3}>
                Processing Fee
              </td>
              <td className="py-2 text-right">
                {currency(order.totalProcessingFeeCents, {
                  fromCents: true,
                }).format()}
              </td>
            </tr>
            <tr>
              <td className="py-2 text-right" colSpan={3}>
                Total
              </td>
              <td className="py-2 text-right">
                {currency(order.totalPriceCents, {
                  fromCents: true,
                }).format()}
              </td>
            </tr>
          </tfoot>
        </table>
      </Section>
    </Container>
  )
}

OrderDetailsPage.fragments = {
  order: gql`
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
    }
  `,
}

export default OrderDetailsPage
