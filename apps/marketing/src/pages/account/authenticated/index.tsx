import { ApolloClient, gql } from '@apollo/client'
import { AccountAuthenticatedPageAssignAnonymousResourcesMutation } from '@generated/AccountAuthenticatedPageAssignAnonymousResourcesMutation'
import {
  AccountAuthenticatedPageSetActiveMembershipMutation,
  AccountAuthenticatedPageSetActiveMembershipMutationVariables,
} from '@generated/AccountAuthenticatedPageSetActiveMembershipMutation'
import { AccountSetupPageBootstrapAccount } from '@generated/AccountSetupPageBootstrapAccount'
import { AccountSetupPageGetDataQuery } from '@generated/AccountSetupPageGetDataQuery'
import { initializeApollo } from '@lib/apollo'
import routes from '@lib/routes'
import { GetServerSideProps } from 'next'
import { Logger } from 'next-axiom'

const makeSetActiveMembership =
  (client: ApolloClient<any>) =>
  async (input: { organizationId: string; membershipId: string }) => {
    await client.mutate<
      AccountAuthenticatedPageSetActiveMembershipMutation,
      AccountAuthenticatedPageSetActiveMembershipMutationVariables
    >({
      mutation: SET_ACTIVE_MEMBERSHIP,
      variables: {
        input,
      },
    })
  }

export const getServerSideProps: GetServerSideProps = async ctx => {
  const log = new Logger()

  const client = initializeApollo(null, ctx)

  const redirectUrl = ctx.query.redirectUrl?.toString()

  try {
    const { data } = await client.query<AccountSetupPageGetDataQuery>({
      query: GET_DATA,
    })

    const viewer = data?.viewer

    if (!viewer) {
      // No active membership, so we must help the user set one
      const memberships = data?.userMemberships || []

      const setActiveMembership = makeSetActiveMembership(client)

      let membership

      if (!memberships.length) {
        // -- (1) If authenticated user doesn't have any memberships, bootstrap account

        const { data } = await client.mutate<AccountSetupPageBootstrapAccount>({
          mutation: BOOTSTRAP_ACCOUNT,
        })

        const bootstrappedMembership = data?.userBoostrap?.memberships?.[0]

        if (!bootstrappedMembership) {
          log.error("Couldn't bootstrap account. This shouldn't happen", {
            context: { data },
          })

          return {
            redirect: {
              permanent: false,
              destination: routes.internal.login.href({
                returnTo: redirectUrl,
              }),
            },
          }
        }

        membership = bootstrappedMembership
      } else if (memberships.length === 1) {
        // -- (2) Else If authenticated user has 1 membership, auto-select membership
        membership = memberships[0]
      } else {
        // -- (3) Else if authenticated user has > 1 membership, redirect to select membership
        return {
          redirect: {
            permanent: false,
            destination: routes.internal.account.memberships.href({
              redirectUrl: ctx.query.redirectUrl?.toString(),
            }),
          },
        }
      }

      await setActiveMembership({
        organizationId: membership.organizationId,
        membershipId: membership.id,
      })
    }
  } catch (error) {
    log.error("Failed to authenticate user. This shouldn't happen", {
      context: { error },
    })

    return {
      redirect: {
        permanent: false,
        destination: routes.internal.login.href({
          returnTo: redirectUrl,
        }),
      },
    }
  }

  try {
    // If authenticated and has an active membership set
    // -- (1) Fire mutation to associate any anonymous resources with the authenticated user
    await client.mutate<AccountAuthenticatedPageAssignAnonymousResourcesMutation>(
      {
        mutation: ASSIGN_ANONYMOUS_RESOURCES,
      },
    )
  } catch (error) {
    log.error("Failed to assign anonymous resources. This shouldn't happen", {
      context: { error },
    })
  }

  return {
    redirect: {
      permanent: false,
      destination: redirectUrl || routes.internal.closet.href(),
    },
  }
}

const Page = () => {
  return null
}

const BOOTSTRAP_ACCOUNT = gql`
  mutation AccountSetupPageBootstrapAccount {
    userBoostrap {
      id
      memberships {
        id
        organizationId
      }
    }
  }
`

const GET_DATA = gql`
  query AccountSetupPageGetDataQuery {
    viewer {
      id
    }
    # We may not have access to the viewer, but we can still check if the user has memberships
    userMemberships {
      id
      organizationId
    }
  }
`

const SET_ACTIVE_MEMBERSHIP = gql`
  mutation AccountAuthenticatedPageSetActiveMembershipMutation(
    $input: UserSetOrganizationInput!
  ) {
    userSetOrganization(input: $input) {
      membershipId
    }
  }
`

const ASSIGN_ANONYMOUS_RESOURCES = gql`
  mutation AccountAuthenticatedPageAssignAnonymousResourcesMutation {
    membershipConnectAnonymousResources {
      membership {
        id
      }
    }
  }
`

export default Page
