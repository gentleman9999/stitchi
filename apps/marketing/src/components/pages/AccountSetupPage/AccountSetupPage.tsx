import { gql } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { LoadingDots, Logo } from '@components/ui'
import { AccountSetupPageMembershipFragment } from '@generated/AccountSetupPageMembershipFragment'
import useSetUserMembership from '@hooks/useSetUserMembership'
import routes from '@lib/routes'

import { useRouter } from 'next/router'
import React from 'react'
import useBootstrapUser from './useBootstrapUser'

interface Props {
  memberships: AccountSetupPageMembershipFragment[]
}

const AccountSetupPage = (props: Props) => {
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const [
    bootstrapAccount,
    {
      user: bootstrappedUser,
      error: bootstrappingError,
      loading: bootstrappingAccount,
    },
  ] = useBootstrapUser()

  const [
    setMembership,
    { loading: settingMembership, error: membershipError },
  ] = useSetUserMembership()

  const { redirectUrl } = router.query

  const nextPath =
    typeof redirectUrl === 'string'
      ? redirectUrl
      : routes.internal.closet.href()

  const handleSetMembership = async (input: {
    organizationId: string
    membershipId: string
  }) => {
    setLoading(true)
    try {
      await setMembership(input)
      window.location.href = nextPath
    } finally {
      setLoading(false)
    }
  }

  const handleBootstrapAccount = async () => {
    if (loading || bootstrappedUser?.id) return

    setLoading(true)
    try {
      const account = await bootstrapAccount()
      if (account) {
        window.location.href = nextPath
      }
    } finally {
      setLoading(false)
    }
  }

  if (props.memberships.length === 1) {
    handleSetMembership({
      organizationId: props.memberships[0].organization?.id || '',
      membershipId: props.memberships[0].id,
    })

    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="rounded-md shadow-magical max-w-md p-8 flex flex-col items-center gap-8 bg-white">
        <Logo className="w-16" />
        {props.memberships.length ? (
          <UserSelectOrganization {...props} onSelect={handleSetMembership} />
        ) : (
          <UserBootstrap {...props} onBootstrap={handleBootstrapAccount} />
        )}

        {bootstrappingError || membershipError ? (
          <ComponentErrorMessage
            error={bootstrappingError || membershipError}
          />
        ) : null}
        {settingMembership || bootstrappingAccount ? <LoadingDots /> : null}
      </div>
    </div>
  )
}

const UserBootstrap = ({ onBootstrap }: { onBootstrap: () => void }) => {
  const [canTransition, setCanTransition] = React.useState(false)

  React.useEffect(() => {
    // If user doesn't belong to any organizations, create a default organization
    onBootstrap()
  }, [onBootstrap])

  // React.useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setCanTransition(true)
  //   }, 5000)

  //   return () => clearTimeout(timeout)
  // }, [])

  // React.useEffect(() => {
  //   if (userId && canTransition) {
  //     router.push(
  //       typeof redirectUrl === 'string'
  //         ? redirectUrl
  //         : routes.internal.closet.href(),
  //     )
  //   }
  // }, [canTransition, redirectUrl, router, userId])

  return (
    <>
      <p className="text-xl text-center font-semibold text-gray-400">
        Just a moment while we put the finishing touches on your closet...
      </p>
    </>
  )
}

const UserSelectOrganization = ({
  memberships,
  onSelect,
}: Props & {
  onSelect: (input: { organizationId: string; membershipId: string }) => void
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800">
        Select an organization
      </h2>
      <div className="flex flex-col gap-2">
        {memberships.map(membership => {
          const { organization } = membership
          if (!organization) return null

          return (
            <button
              key={membership.id}
              className="w-full rounded-md border border-gray-200 py-2 px-4 flex items-center justify-between gap-2 min-w-[300px]"
              onClick={() =>
                onSelect({
                  membershipId: membership.id,
                  organizationId: organization.id,
                })
              }
            >
              <span>{membership.organization?.name}</span>
              <span className="text-gray-400 text-sm">Select</span>
            </button>
          )
        })}
      </div>
    </>
  )
}

AccountSetupPage.fragments = {
  membership: gql`
    fragment AccountSetupPageMembershipFragment on Membership {
      id
      organization {
        id
        name
      }
    }
  `,
}

export default AccountSetupPage
