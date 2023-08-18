import { gql, useQuery } from '@apollo/client'
import AccountSetupPage from '@components/pages/AccountSetupPage'
import { AccountSetupPageGetDataQuery } from '@generated/AccountSetupPageGetDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import routes from '@lib/routes'
import { GetServerSideProps } from 'next'
import React from 'react'

const getServerSideProps: GetServerSideProps = async ctx => {
  const client = initializeApollo(null, ctx)

  const { data } = await client.query<AccountSetupPageGetDataQuery>({
    query: GET_DATA,
  })

  const memberships = data?.userMemberships || []

  if (!memberships.length) {
    await client.mutate({
      mutation: BOOTSTRAP_ACCOUNT,
    })

    return {
      redirect: {
        permanent: false,
        destination:
          ctx.query.redirectUrl?.toString() || routes.internal.closet.href(),
      },
    }
  }

  return addApolloState(client, { props: {} })
}

const Page = () => {
  const { data, loading } = useQuery<AccountSetupPageGetDataQuery>(GET_DATA)

  if (loading) return null

  const memberships = data?.userMemberships || []

  return <AccountSetupPage memberships={memberships} />
}

const GET_DATA = gql`
  ${AccountSetupPage.fragments.membership}
  query AccountSetupPageGetDataQuery {
    userMemberships {
      id
      ...AccountSetupPageMembershipFragment
    }
  }
`

const BOOTSTRAP_ACCOUNT = gql`
  mutation AccountSetupPageBootstrapAccount {
    userBoostrap {
      id
      organizations {
        id
      }
    }
  }
`

export { getServerSideProps }

export default Page
