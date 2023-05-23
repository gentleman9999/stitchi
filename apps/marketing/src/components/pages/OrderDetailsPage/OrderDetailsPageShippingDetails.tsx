import { gql } from '@apollo/client'
import { OrderDetailsPageShippingDetailsOrderFragment } from '@generated/OrderDetailsPageShippingDetailsOrderFragment'
import pluralize from 'pluralize'
import React from 'react'

interface Props {
  order: OrderDetailsPageShippingDetailsOrderFragment
}

const OrderDetailsPageShippingDetails = ({ order }: Props) => {
  const { shippingAddress, fulfillments } = order

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col text-gray-600 text-sm">
          <h2 className="font-semibold text-gray-900 mb-2">Delivery address</h2>
          <span>
            {shippingAddress?.firstName} {shippingAddress?.lastName}
          </span>
          <span>{shippingAddress?.company}</span>
          <span>{shippingAddress?.address1}</span>
          <span>{shippingAddress?.address2}</span>
          <span>
            {shippingAddress?.city}, {shippingAddress?.provinceCode}{' '}
            {shippingAddress?.zip}
          </span>
          <span>{shippingAddress?.country}</span>
        </div>

        <div className="flex flex-col text-gray-600 text-sm">
          <h2 className="font-semibold text-gray-900 mb-2">Shipping updates</h2>
          <span>{shippingAddress?.phone}</span>
        </div>
      </div>

      <div>
        <span>
          Tracking {pluralize('number', fulfillments.length)}:{' '}
          {fulfillments
            .map(({ trackingInfo }) =>
              trackingInfo ? (
                <a
                  key={trackingInfo.id}
                  href={trackingInfo.trackingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {trackingInfo.trackingNumber}
                </a>
              ) : null,
            )
            .reduce((acc, curr) => [acc, ', ', curr])}
        </span>
        <div className="w-full h-2 bg-primary rounded-full" />
        <div className="grid grid-cols-4">
          <span>Order placed</span>
          <span className="text-center">Processing</span>
          <span className="text-center">Shipped</span>
          <span className="text-right">Delivered</span>
        </div>
      </div>
    </div>
  )
}

OrderDetailsPageShippingDetails.fragments = {
  order: gql`
    fragment OrderDetailsPageShippingDetailsOrderFragment on Order {
      id
      fulfillments {
        id
        trackingInfo {
          id
          trackingNumber
          trackingUrl
        }
      }
      shippingAddress {
        id
        firstName
        lastName
        company
        phone
        address1
        address2
        city
        country
        province
        provinceCode
        zip
      }
    }
  `,
}

export default OrderDetailsPageShippingDetails
