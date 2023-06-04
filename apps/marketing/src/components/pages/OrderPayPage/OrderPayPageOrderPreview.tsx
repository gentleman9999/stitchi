import { gql } from '@apollo/client'
import { OrderPayPageOrderPreviewItemFragment } from '@generated/OrderPayPageOrderPreviewItemFragment'
import currency from 'currency.js'
import React from 'react'

interface Props {
  order: OrderPayPageOrderPreviewItemFragment
}

const OrderPayPageOrderPreview = ({ order }: Props) => {
  const { itemSummaries: items } = order
  return (
    <div className="border p-4 rounded-md shadow-sm bg-gray-50">
      <h2 className="text-lg font-semibold text-gray-400 mb-2">Summary</h2>

      <table className="w-full text-sm">
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td className="py-1">
                <b>{item.title}</b>
              </td>
              <td className="text-gray-600">{item.quantity} qty.</td>
              <td className="text-right text-gray-600">
                {currency(item.totalPriceCents, {
                  fromCents: true,
                }).format()}
              </td>
            </tr>
          ))}
          <tr className="h-3" />
        </tbody>
        <tfoot className="border-t">
          <tr className="h-3" />

          <tr>
            <td></td>
            <td className="py-1 text-gray-600">Subtotal</td>
            <td className="text-right text-gray-600">
              {currency(order.subtotalPriceCents, {
                fromCents: true,
              }).format()}
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="py-1 text-gray-600">Shipping</td>
            <td className="text-right text-gray-600">
              {currency(order.totalShippingCents, {
                fromCents: true,
              }).format()}
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="py-1 text-gray-600">Tax</td>
            <td className="text-right text-gray-600">
              {currency(order.totalTaxCents, {
                fromCents: true,
              }).format()}
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="py-1 text-gray-600">Processing Fee</td>
            <td className="text-right text-gray-600">
              {currency(order.totalProcessingFeeCents, {
                fromCents: true,
              }).format()}
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="py-1">
              <b>Total</b>
            </td>
            <td className="text-right">
              <b>
                {currency(order.totalPriceCents, {
                  fromCents: true,
                }).format()}
              </b>
            </td>
          </tr>

          {order.totalAmountPaidCents > 0 ? (
            <>
              <tr>
                <td></td>
                <td className="py-1">Amount Paid</td>
                <td className="text-right">
                  {currency(order.totalAmountPaidCents, {
                    fromCents: true,
                  }).format()}
                </td>
              </tr>

              <tr>
                <td></td>
                <td className="py-1">Amount Due</td>
                <td className="text-right">
                  {currency(order.totalAmountDueCents, {
                    fromCents: true,
                  }).format()}
                </td>
              </tr>
            </>
          ) : null}
        </tfoot>
      </table>
    </div>
  )
}

OrderPayPageOrderPreview.fragments = {
  order: gql`
    fragment OrderPayPageOrderPreviewItemFragment on Order {
      id
      totalTaxCents
      totalPriceCents
      totalAmountPaidCents
      totalAmountDueCents
      totalShippingCents
      subtotalPriceCents
      totalProcessingFeeCents
      itemSummaries {
        id
        title
        quantity
        totalPriceCents
      }
    }
  `,
}

export default OrderPayPageOrderPreview
