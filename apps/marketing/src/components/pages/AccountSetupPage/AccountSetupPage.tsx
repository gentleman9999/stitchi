import { gql } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { LoadingDots, Logo } from '@components/ui'
import { AccountSetupPageMembershipFragment } from '@generated/AccountSetupPageMembershipFragment'
import useSetUserMembership from '@components/hooks/useSetUserMembership'
import routes from '@lib/routes'

import { useRouter } from 'next/router'
import React from 'react'
import { useLogger } from 'next-axiom'

interface Props {
  memberships: AccountSetupPageMembershipFragment[]
}

const AccountSetupPage = (props: Props) => {
  const logger = useLogger()
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const [
    setMembership,
    { loading: settingMembership, error: membershipError },
  ] = useSetUserMembership()

  const { redirectUrl } = router.query

  const nextPath =
    typeof redirectUrl === 'string'
      ? redirectUrl
      : routes.internal.closet.href()

  const handleSetMembership = React.useCallback(
    async (input: { organizationId: string; membershipId: string }) => {
      setLoading(true)
      try {
        await setMembership(input)
        window.location.href = nextPath
      } finally {
        setLoading(false)
      }
    },
    [nextPath, setMembership],
  )

  React.useEffect(() => {
    if (props.memberships.length === 1 && !loading) {
      logger.debug('CLIENT SIDE SET MEMBERSHIP CALLED')

      handleSetMembership({
        organizationId: props.memberships[0].organization?.id || '',
        membershipId: props.memberships[0].id,
      })
    }
  }, [handleSetMembership, loading, props.memberships, logger])

  if (props.memberships.length === 1) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="rounded-md shadow-magical max-w-md p-8 flex flex-col items-center gap-8 bg-white">
        <Logo className="w-16" />
        {props.memberships.length ? (
          <UserSelectOrganization {...props} onSelect={handleSetMembership} />
        ) : (
          <ComponentErrorMessage error="No memberships found. This should not happen." />
        )}

        {settingMembership ? <LoadingDots /> : null}
      </div>
    </div>
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
