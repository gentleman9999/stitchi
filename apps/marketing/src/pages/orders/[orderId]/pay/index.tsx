import { gql, useQuery } from '@apollo/client'
import { FocusedLayout } from '@components/layout'
import OrderPayPage from '@components/pages/OrderPayPage'
import {
  OrderPayPageCreatepaymentIntent,
  OrderPayPageCreatepaymentIntentVariables,
  OrderPayPageCreatepaymentIntent_paymentIntentCreate_paymentIntent as PaymentIntent,
} from '@generated/OrderPayPageCreatepaymentIntent'
import {
  OrderPayPageGetDataQuery,
  OrderPayPageGetDataQueryVariables,
} from '@generated/OrderPayPageGetDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import routes from '@lib/routes'
import { GetServerSideProps } from 'next'
import React, { ReactElement } from 'react'

const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const { orderId } = query

  if (typeof orderId !== 'string') {
    return {
      notFound: true,
    }
  }

  const client = initializeApollo()

  const { data } = await client.query<
    OrderPayPageGetDataQuery,
    OrderPayPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: {
      orderId,
    },
  })

  if (!data?.order) {
    return {
      notFound: true,
    }
  }

  if (data.order.totalAmountDueCents <= 0) {
    return {
      redirect: {
        destination: routes.internal.order.show.href({ orderId }),
        permanent: false,
      },
    }
  }

  const { data: paymentIntentData, errors } = await client.mutate<
    OrderPayPageCreatepaymentIntent,
    OrderPayPageCreatepaymentIntentVariables
  >({
    mutation: CREATE_PAYMENT_INTENT,
    variables: {
      input: { orderId },
    },
  })

  if (!paymentIntentData?.paymentIntentCreate?.paymentIntent) {
    console.error(`Failed to create payment intent for order ${orderId}`, {
      context: { paymentIntentData, errors },
    })
    return {
      redirect: {
        destination: routes.internal.order.show.href({ orderId }),
        permanent: false,
      },
    }
  }

  return addApolloState(client, {
    props: {
      orderId,
      paymentIntent: paymentIntentData.paymentIntentCreate.paymentIntent,
    },
  })
}

interface Props {
  orderId: string
  paymentIntent: PaymentIntent
}

const Page = ({ orderId, paymentIntent }: Props) => {
  const { data } = useQuery<
    OrderPayPageGetDataQuery,
    OrderPayPageGetDataQueryVariables
  >(GET_DATA, { variables: { orderId } })

  if (!data?.order) {
    return null
  }

  return <OrderPayPage order={data.order} paymentIntent={paymentIntent} />
}

Page.getLayout = (page: ReactElement) => <FocusedLayout>{page}</FocusedLayout>

const GET_DATA = gql`
  ${OrderPayPage.fragments.order}
  query OrderPayPageGetDataQuery($orderId: ID!) {
    order(id: $orderId) {
      id
      totalAmountDueCents
      ...OrderPayPageOrderFragment
    }
  }
`

const CREATE_PAYMENT_INTENT = gql`
  ${OrderPayPage.fragments.paymentIntent}
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
export { getServerSideProps }
