'use client'

import { gql, useQuery } from '@apollo/client'
import OrderDetailsPage from '@components/pages/OrderDetailsPage'
import { OrderPaymentStatus } from '@generated/globalTypes'
import {
  OrderDetailsPageGetDataQuery,
  OrderDetailsPageGetDataQueryVariables,
} from '@generated/types'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const params = useParams<{ orderId: string }>()

  const { data, error, startPolling, stopPolling } = useQuery<
    OrderDetailsPageGetDataQuery,
    OrderDetailsPageGetDataQueryVariables
  >(GET_DATA, {
    variables: { orderId: `${params?.orderId}` },
    skip: !params?.orderId,
  })

  const { order } = data || {}

  React.useEffect(() => {
    // Payment processing happens async so if we land on an order we should poll for an updated payment status

    if (order?.paymentStatus === OrderPaymentStatus.NOT_PAID) {
      startPolling(10000)

      setTimeout(
        () => {
          stopPolling()
        },
        15 * 1000, // 15 seconds
      )
    } else {
      stopPolling()
    }

    return () => {
      stopPolling()
    }
  }, [order?.paymentStatus, startPolling, stopPolling])

  if (error) {
    return <div>{error.message}</div>
  }

  if (!order) {
    return null
  }

  return <OrderDetailsPage order={order} />
}

const GET_DATA = gql`
  ${OrderDetailsPage.fragments.order}
  query OrderDetailsPageGetDataQuery($orderId: ID!) {
    order(id: $orderId) {
      id
      paymentStatus
      ...OrderDetailsPageOrderFragment
    }
  }
`

export default Page
