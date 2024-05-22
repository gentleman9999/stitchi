import { gql } from '@apollo/client'
import {
  OrderPayPageCreatepaymentIntent,
  OrderPayPageCreatepaymentIntentVariables,
  OrderPayPageGetDataQuery,
  OrderPayPageGetDataQueryVariables,
} from '@generated/types'
import { getClient } from '@lib/apollo-rsc'
import { RedirectType, notFound, redirect } from 'next/navigation'
import React from 'react'
import { fragments as orderPayPageFragments } from './OrderPayPage/OrderPayPage.fragments'
import OrderPayPage from './OrderPayPage'
import routes from '@lib/routes'

interface Params {
  orderId: string
}

interface Props {
  params: Params
}

const Page = async ({ params }: Props) => {
  const client = await getClient()

  const { data } = await client.query<
    OrderPayPageGetDataQuery,
    OrderPayPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: {
      orderId: params.orderId,
    },
  })

  if (!data.order) {
    notFound()
  }

  if (data.order.totalAmountDueCents <= 0) {
    redirect(
      routes.internal.closet.orders.show.href({ orderId: params.orderId }),
      RedirectType.replace,
    )
  }

  const { data: paymentIntentData, errors } = await client.mutate<
    OrderPayPageCreatepaymentIntent,
    OrderPayPageCreatepaymentIntentVariables
  >({
    mutation: CREATE_PAYMENT_INTENT,
    variables: {
      input: { orderId: params.orderId },
    },
  })

  if (!paymentIntentData?.paymentIntentCreate?.paymentIntent) {
    console.error(
      `Failed to create payment intent for order ${params.orderId}`,
      {
        context: { paymentIntentData, errors },
      },
    )

    redirect(
      routes.internal.closet.orders.show.href({ orderId: params.orderId }),
      RedirectType.replace,
    )
  }

  return (
    <OrderPayPage
      order={data.order}
      paymentIntent={paymentIntentData.paymentIntentCreate.paymentIntent}
    />
  )
}

const GET_DATA = gql`
  ${orderPayPageFragments.order}
  query OrderPayPageGetDataQuery($orderId: ID!) {
    order(id: $orderId) {
      id
      totalAmountDueCents
      ...OrderPayPageOrderFragment
    }
  }
`

const CREATE_PAYMENT_INTENT = gql`
  ${orderPayPageFragments.paymentIntent}
  mutation OrderPayPageCreatepaymentIntent($input: PaymentIntentCreateInput!) {
    paymentIntentCreate(input: $input) {
      paymentIntent {
        id
        ...OrderPayPagePaymentIntentFragment
      }
    }
  }
`

export default Page
