import { gql, useQuery } from '@apollo/client'
import { FocusedLayout } from '@components/layout'
import AccountMembershipAcceptPage from '@components/pages/AccountMembershipAcceptPage'
import {
  AcceptMembershipPageGetDataQuery,
  AcceptMembershipPageGetDataQueryVariables,
} from '@generated/AcceptMembershipPageGetDataQuery'
import {
  AcceptMembershipPageSetActiveMembershipMutation,
  AcceptMembershipPageSetActiveMembershipMutationVariables,
} from '@generated/AcceptMembershipPageSetActiveMembershipMutation'
import { addApolloState, initializeApollo } from '@lib/apollo'
import { getAccessToken } from '@lib/auth'
import routes from '@lib/routes'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

export const getServerSideProps: GetServerSideProps = async ctx => {
  const membershipId = ctx.query.membershipId

  if (typeof membershipId !== 'string') {
    return {
      notFound: true,
    }
  }

  const client = initializeApollo(undefined, ctx)

  const { data } = await client.query<
    AcceptMembershipPageGetDataQuery,
    AcceptMembershipPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: {
      membershipId,
    },
  })

  if (data.membershipInvite.accepted) {
    const accessToken = await getAccessToken(ctx)

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

    return {
      redirect: {
        destination: routes.internal.closet.href(),
        permanent: false,
      },
    }
  }

  return addApolloState(client, {
    props: {},
  })
}

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

const SET_ACTIVE_MEMBERSHIP = gql`
  mutation AcceptMembershipPageSetActiveMembershipMutation(
    $input: UserSetOrganizationInput!
  ) {
    userSetOrganization(input: $input) {
      organizationId
    }
  }
`

const GET_DATA = gql`
  ${AccountMembershipAcceptPage.fragments.invite}
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

export default AcceptMembershipPage
