import { gql } from '@apollo/client'
import { getAccessToken } from '@auth0/nextjs-auth0'
import {
  AcceptMembershipPageGetDataQuery,
  AcceptMembershipPageGetDataQueryVariables,
  AcceptMembershipPageSetActiveMembershipMutation,
  AcceptMembershipPageSetActiveMembershipMutationVariables,
} from '@generated/types'
import { getClient } from '@lib/apollo-rsc'
import routes from '@lib/routes'
import { RedirectType, redirect } from 'next/navigation'
import React from 'react'
import AccountMembershipAcceptPage from './AccountMembershipAcceptPage'
import { fragments as accountMembershipAcceptPageFragments } from './AccountMembershipAcceptPage.fragments'

interface Params {
  membershipId: string
}

interface Props {
  params: Params
}

const Page = async ({ params }: Props) => {
  const client = await getClient()

  const { data } = await client.query<
    AcceptMembershipPageGetDataQuery,
    AcceptMembershipPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: {
      membershipId: params.membershipId,
    },
  })

  if (data.membershipInvite.accepted) {
    let accessToken

    try {
      accessToken = (await getAccessToken()).accessToken
    } catch (error) {}

    if (accessToken) {
      // There is a logged in user

      const { organizationId, membershipId } = data.membershipInvite

      // Make sure we set this memberships as the active one
      await client.mutate<
        AcceptMembershipPageSetActiveMembershipMutation,
        AcceptMembershipPageSetActiveMembershipMutationVariables
      >({
        mutation: SET_ACTIVE_MEMBERSHIP,
        variables: {
          input: {
            membershipId,
            organizationId,
          },
        },
      })
    }

    redirect(routes.internal.closet.href(), RedirectType.replace)
  }

  return <AccountMembershipAcceptPage invite={data.membershipInvite} />
}

const GET_DATA = gql`
  ${accountMembershipAcceptPageFragments.invite}
  query AcceptMembershipPageGetDataQuery($membershipId: ID!) {
    membershipInvite(id: $membershipId) {
      id
      membershipId
      organizationId
      accepted
      ...AccountMembershipAcceptPageMembershipInviteFragment
    }
  }
`

const SET_ACTIVE_MEMBERSHIP = gql`
  mutation AcceptMembershipPageSetActiveMembershipMutation(
    $input: UserSetOrganizationInput!
  ) {
    userSetOrganization(input: $input) {
      organizationId
    }
  }
`

export default Page
