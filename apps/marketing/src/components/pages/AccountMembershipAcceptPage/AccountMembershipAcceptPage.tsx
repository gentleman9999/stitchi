import { gql, useMutation } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Container, LoadingDots } from '@components/ui'
import Button from '@components/ui/ButtonV2/Button'
import {
  AccountMemberhsipAcceptPageAcceptMembershipMutation,
  AccountMemberhsipAcceptPageAcceptMembershipMutationVariables,
} from '@generated/AccountMemberhsipAcceptPageAcceptMembershipMutation'
import { AccountMembershipAcceptPageMembershipInviteFragment } from '@generated/AccountMembershipAcceptPageMembershipInviteFragment'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

interface Props {
  loading: boolean
  invite: AccountMembershipAcceptPageMembershipInviteFragment | null | undefined
}

const AccountMembershipAcceptPage = ({
  invite,
  loading: dataLoading,
}: Props) => {
  const { user } = useUser()
  const [acceptMembership, acceptMembershipMutation] = useMutation<
    AccountMemberhsipAcceptPageAcceptMembershipMutation,
    AccountMemberhsipAcceptPageAcceptMembershipMutationVariables
  >(ACCEPT_MEMBERSHIP, {
    update(cache, { data }) {
      const membership = data?.membershipInviteAccept?.membership

      if (membership) {
        cache.evict({ id: cache.identify({ ...membership }) })
        cache.gc()
      }
    },
  })

  const handleAcceptMembership = async () => {
    if (invite?.membershipId) {
      await acceptMembership({
        variables: {
          input: {
            membershipId: invite.membershipId,
          },
        },
      })
    }
  }

  return (
    <Container>
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="max-w-lg w-full bg-paper shadow-magical p-8 rounded-lg text-center flex flex-col items-center justify-center gap-10">
          {dataLoading ? (
            <LoadingDots />
          ) : (
            <>
              <h2 className="text-2xl font-medium">
                You&apos;ve been invited to join {invite?.organizationName}
              </h2>
              <p>
                To accept the invitation please login as{' '}
                <b>{invite?.invitedEmail}</b>.
              </p>

              {user?.email === invite?.invitedEmail ? (
                <Button
                  size="xl"
                  onClick={handleAcceptMembership}
                  loading={acceptMembershipMutation.loading}
                  className="w-full"
                  color="brandPrimary"
                >
                  Accept invitation
                </Button>
              ) : (
                <>
                  {user ? (
                    <Button
                      size="xl"
                      href={routes.internal.logout.href({
                        returnTo: window.location.pathname,
                      })}
                      className="w-full"
                      color="brandPrimary"
                      Component={Link}
                    >
                      Log in
                    </Button>
                  ) : (
                    <Button
                      size="xl"
                      href={routes.internal.login.href({
                        returnTo: window.location.pathname,
                      })}
                      className="w-full"
                      color="brandPrimary"
                      Component={Link}
                    >
                      Log in
                    </Button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  )
}

AccountMembershipAcceptPage.fragments = {
  invite: gql`
    fragment AccountMembershipAcceptPageMembershipInviteFragment on MembershipInvite {
      id
      membershipId
      invitedEmail
      organizationName
    }
  `,
}

const ACCEPT_MEMBERSHIP = gql`
  mutation AccountMemberhsipAcceptPageAcceptMembershipMutation(
    $input: MembershipInviteAcceptInput!
  ) {
    membershipInviteAccept(input: $input) {
      membership {
        id
      }
    }
  }
`

export default AccountMembershipAcceptPage
