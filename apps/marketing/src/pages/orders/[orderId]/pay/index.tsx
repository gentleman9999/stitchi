import { gql, useQuery } from '@apollo/client'
import { PrimaryLayout } from '@components/layout'
import OrderPayPage from '@components/pages/OrderPayPage'
import {
  OrderPayPageGetDataQuery,
  OrderPayPageGetDataQueryVariables,
} from '@generated/OrderPayPageGetDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import routes from '@lib/routes'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
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

  return addApolloState(client, {
    props: {
      orderId,
    },
  })
}

interface Props {
  orderId: string
}

const Page = ({ orderId }: Props) => {
  const { data } = useQuery<
    OrderPayPageGetDataQuery,
    OrderPayPageGetDataQueryVariables
  >(GET_DATA, { variables: { orderId } })

  if (!data?.order) {
    return null
  }

  return <OrderPayPage order={data.order} />
}

Page.getLayout = (page: ReactElement) => <PrimaryLayout>{page}</PrimaryLayout>

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

export default Page
export { getServerSideProps }
