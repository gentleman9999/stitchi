import { gql, useQuery } from '@apollo/client'
import { FocusedLayout } from '@components/layout'
import AccountMembershipAcceptPage from '@components/pages/AccountMembershipAcceptPage'
import {
  AcceptMembershipPageGetDataQuery,
  AcceptMembershipPageGetDataQueryVariables,
} from '@generated/AcceptMembershipPageGetDataQuery'
import { useRouter } from 'next/router'
import React from 'react'

const AcceptMembershipPage = () => {
  const router = useRouter()

  const { data, loading } = useQuery<
    AcceptMembershipPageGetDataQuery,
    AcceptMembershipPageGetDataQueryVariables
  >(GET_DATA, {
    skip: !router.query.membershipId,
    variables: {
      membershipId: router.query.membershipId as string,
    },
  })

  return (
    <AccountMembershipAcceptPage
      invite={data?.membershipInvite}
      loading={loading}
    />
  )
}

AcceptMembershipPage.getLayout = (page: React.ReactElement) => (
  <FocusedLayout disableNavSpacing>{page}</FocusedLayout>
)

const GET_DATA = gql`
  ${AccountMembershipAcceptPage.fragments.invite}
  query AcceptMembershipPageGetDataQuery($membershipId: ID!) {
    membershipInvite(id: $membershipId) {
      id
      ...AccountMembershipAcceptPageMembershipInviteFragment
    }
  }
`

export default AcceptMembershipPage
