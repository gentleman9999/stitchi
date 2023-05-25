import { gql } from '@apollo/client'
import { OrderDetailsPageLineItemsItemFragment } from '@generated/OrderDetailsPageLineItemsItemFragment'
import React from 'react'
import currency from 'currency.js'

interface Props {
  items: OrderDetailsPageLineItemsItemFragment[]
}

const OrderDetailsPageLineItems = ({ items }: Props) => {
  return (
    <>
      <ul className="sm:sr-only flex flex-col gap-8">
        {items.map(item => {
          const [name, ...rest] = item.title.split(' - ')
          return (
            <li key={item.id} className="flex flex-col sm:flex-row sm:gap-4">
              <span className="text-gray-900 font-bold">{name}</span>
              {rest.length ? (
                <span className="text-sm">{rest.join(' - ')}</span>
              ) : null}
              <div className="flex text-gray-600 font-normal text-sm">
                <span>{item.quantity}</span>
                <span className="mx-1">×</span>
                <span>
                  {currency(item.unitPriceCents, {
                    fromCents: true,
                  }).format()}
                </span>
              </div>

              <span className="text-gray-900 font-semibold text-right">
                {currency(item.totalPriceCents, {
                  fromCents: true,
                }).format()}
              </span>
            </li>
          )
        })}
      </ul>
      <table className="!w-full sr-only sm:not-sr-only">
        <thead className="sr-only">
          <tr>
            <td>Name</td>
            <td>Quantity</td>
            <td>Unit Price</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          {items.map(item => {
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
    </>
  )
}

OrderDetailsPageLineItems.fragments = {
  item: gql`
    fragment OrderDetailsPageLineItemsItemFragment on OrderItem {
      id
      title
      quantity
      unitPriceCents
      totalPriceCents
    }
  `,
}

export default OrderDetailsPageLineItems
