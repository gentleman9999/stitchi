import { gql } from '@apollo/client'
import { OrderDetailsPageShippingDetailsOrderFragment } from '@generated/OrderDetailsPageShippingDetailsOrderFragment'
import pluralize from 'pluralize'
import React from 'react'
import ProgressBar from './ProgressBar'

interface Props {
  order: OrderDetailsPageShippingDetailsOrderFragment
}

const OrderDetailsPageShippingDetails = ({ order }: Props) => {
  const { shippingAddress, fulfillments } = order

  return (
    <div className="border p-6 rounded-sm">
      <div className="grid grid-cols-3 gap-4">
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
        <div className="flex flex-col text-gray-600 text-sm">
          <h2 className="font-semibold text-gray-900 mb-2">Tracking</h2>
          <span>
            {fulfillments.length
              ? fulfillments.map(({ trackingInfo }, i) =>
                  trackingInfo ? (
                    <>
                      <a
                        key={trackingInfo.id}
                        href={trackingInfo.trackingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        {trackingInfo.trackingNumber}
                      </a>
                      {i < fulfillments.length - 1 ? ', ' : null}
                    </>
                  ) : null,
                )
              : 'No tracking information available at this time.'}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <ProgressBar />
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
