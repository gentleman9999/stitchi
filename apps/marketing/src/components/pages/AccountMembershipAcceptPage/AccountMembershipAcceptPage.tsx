import { gql } from '@apollo/client'
import { Container, LoadingDots } from '@components/ui'
import Button from '@components/ui/ButtonV2/Button'
import { AccountMembershipAcceptPageMembershipInviteFragment } from '@generated/AccountMembershipAcceptPageMembershipInviteFragment'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

interface Props {
  loading: boolean
  invite: AccountMembershipAcceptPageMembershipInviteFragment | null | undefined
}

const AccountMembershipAcceptPage = ({ invite, loading }: Props) => {
  return (
    <Container>
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="max-w-lg w-full bg-paper shadow-magical p-8 rounded-lg text-center flex flex-col items-center justify-center gap-10">
          {loading ? (
            <LoadingDots />
          ) : (
            <>
              <h2 className="text-2xl font-medium">
                You&apos;ve been invited to join {invite?.organizationName}
              </h2>
              <p>
                To accept the invitation please login as {invite?.invitedEmail}.
              </p>

              <Button
                size="xl"
                href={routes.internal.login.href()}
                Component={Link}
                className="w-full"
                color="brandPrimary"
              >
                Log in
              </Button>
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
      invitedEmail
      organizationName
    }
  `,
}

export default AccountMembershipAcceptPage
