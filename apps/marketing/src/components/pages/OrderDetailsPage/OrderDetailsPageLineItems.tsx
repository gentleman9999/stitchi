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
      <ul className="sm:hidden flex flex-col gap-8">
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
      <table className="hidden sm:block table-auto">
        <thead>
          <tr className="font-semibold text-sm">
            <td className="sr-only">Name</td>
            <td className="px-3 text-right">Quantity</td>
            <td className="px-3 whitespace-nowrap text-right">Unit Price</td>
            <td className="pl-3 text-right">Total</td>
          </tr>
        </thead>
        <tbody>
          {items.map(item => {
            const [name, ...rest] = item.title.split(' - ')
            return (
              <tr key={item.id}>
                <td className="py-2 w-full">
                  <span className="text-gray-900 font-bold">{name}</span>
                  {rest.length ? <> - {rest.join(' - ')}</> : null}
                </td>
                <td className="py-2 text-right px-3">{item.quantity}</td>
                <td className="py-2 text-right px-3">
                  {currency(item.unitPriceCents, {
                    fromCents: true,
                  }).format()}
                </td>
                <td className="py-2 text-right pl-3">
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
