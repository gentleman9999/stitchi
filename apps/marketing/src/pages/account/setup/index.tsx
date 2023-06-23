import { gql, useQuery } from '@apollo/client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import AccountSetupPage from '@components/pages/AccountSetupPage'
import { AccountSetupPageGetDataQuery } from '@generated/AccountSetupPageGetDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import { withAuthentication } from '@lib/auth'
import React from 'react'

const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ctx => {
    const client = initializeApollo(null, ctx)

    await client.query<AccountSetupPageGetDataQuery>({
      query: GET_DATA,
    })

    return addApolloState(client, { props: {} })
  },
})

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

export { getServerSideProps }

export default withAuthentication(Page)
