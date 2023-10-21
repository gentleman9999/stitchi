import { gql, useQuery } from '@apollo/client'
import { ClosetLayout } from '@components/layout'
import OrderDetailsPage from '@components/pages/OrderDetailsPage'
import { OrderPaymentStatus } from '@generated/globalTypes'
import {
  OrderDetailsPageGetDataQuery,
  OrderDetailsPageGetDataQueryVariables,
} from '@generated/OrderDetailsPageGetDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import React, { ReactElement } from 'react'

const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const { orderId } = ctx.query

  if (typeof orderId !== 'string') {
    return {
      notFound: true,
    }
  }

  const client = initializeApollo(undefined, ctx)

  await client.query<
    OrderDetailsPageGetDataQuery,
    OrderDetailsPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: { orderId },
  })

  return addApolloState(client, { props: { orderId } })
}

interface Props {
  orderId: string
}

const Page = ({ orderId }: Props) => {
  const { data, error, startPolling, stopPolling } = useQuery<
    OrderDetailsPageGetDataQuery,
    OrderDetailsPageGetDataQueryVariables
  >(GET_DATA, { variables: { orderId } })

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

  return (
    <>
      <NextSeo nofollow noindex />
      <OrderDetailsPage order={order} />
    </>
  )
}

Page.getLayout = (page: ReactElement) => <ClosetLayout>{page}</ClosetLayout>

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
export { getServerSideProps }
