import { ApolloClient, gql } from '@apollo/client'
import {
  AccountAuthenticatedPageAssignAnonymousResourcesMutation,
  AccountAuthenticatedPageSetActiveMembershipMutation,
  AccountAuthenticatedPageSetActiveMembershipMutationVariables,
  AccountSetupPageBootstrapAccount,
  AccountSetupPageGetDataQuery,
} from '@generated/types'
import { getClient } from '@lib/apollo-rsc'
import routes from '@lib/routes'
import { Logger } from 'next-axiom'
import { NextResponse } from 'next/server'

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

export const GET = async (
  request: Request,
  context: {
    params?: {
      redirectUrl?: string
    }
  },
) => {
  const log = new Logger()

  const client = await getClient()

  const redirectUrl = context.params?.redirectUrl

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

          return NextResponse.redirect(
            new URL(
              routes.internal.login.href({
                returnTo: redirectUrl,
              }),
              request.url,
            ),
            {
              status: 302,
            },
          )
        }

        membership = bootstrappedMembership
      } else if (memberships.length === 1) {
        // -- (2) Else If authenticated user has 1 membership, auto-select membership
        membership = memberships[0]
      } else {
        // -- (3) Else if authenticated user has > 1 membership, redirect to select membership
        return NextResponse.redirect(
          new URL(
            routes.internal.account.memberships.href({
              redirectUrl,
            }),
            request.url,
          ),
          {
            status: 302,
          },
        )
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

    return NextResponse.redirect(
      new URL(
        routes.internal.login.href({
          returnTo: redirectUrl,
        }),
        request.url,
      ),
      {
        status: 302,
      },
    )
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

  return NextResponse.redirect(
    new URL(redirectUrl || routes.internal.closet.href(), request.url),
    {
      status: 302,
    },
  )
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
