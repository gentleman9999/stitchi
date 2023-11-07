'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import { StandoutType, useStandout } from '@components/context'
import useSetUserMembership from '@components/hooks/useSetUserMembership'
import Button from '@components/ui/ButtonV2/Button'
import LoadingDots from '@components/ui/LoadingDots'

import {
  ViewerMembershipsIndexPageGetDataQuer,
  ViewerMembershipsIndexPageGetDataQuerVariables,
} from '@generated/types'
import { PlusIcon } from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import { notEmpty } from '@lib/utils/typescript'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const ViewerMembershipsIndexPage = () => {
  const { setStandout } = useStandout()

  const router = useRouter()
  const { redirectUrl } = useParams<{
    redirectUrl?: string
  }>()!

  const { data } = useSuspenseQuery<
    ViewerMembershipsIndexPageGetDataQuer,
    ViewerMembershipsIndexPageGetDataQuerVariables
  >(GET_DATA)

  const [setMembership] = useSetUserMembership()

  const nextPath = routes.internal.account.authenticated.href({
    redirectUrl:
      typeof redirectUrl === 'string'
        ? redirectUrl
        : routes.internal.closet.href(),
  })

  const memberships = data?.userMemberships || []

  React.useEffect(() => {
    if (!memberships?.length) {
      router.push(nextPath)
    }
  }, [memberships?.length, nextPath, router])

  const handleSetMembership = React.useCallback(
    async (input: { organizationId: string; membershipId: string }) => {
      await setMembership(input)
      window.location.href = nextPath
    },
    [nextPath, setMembership],
  )

  const organizationIds =
    memberships?.map(m => m.organization?.id).filter(notEmpty) || []

  const organizationIdsSet = new Set(organizationIds)

  const userHasMultipleRoles =
    organizationIds.length !== organizationIdsSet.size

  return (
    <>
      <div className="flex flex-1 flex-col gap-2 w-full">
        {memberships.map(membership => {
          const { organization } = membership
          if (!organization) return null

          return (
            <OrganizationButton
              key={membership.id}
              membership={membership}
              displayRole={userHasMultipleRoles}
              onClick={async () =>
                handleSetMembership({
                  membershipId: membership.id,
                  organizationId: organization.id,
                })
              }
            />
          )
        })}

        <hr className="my-2" />

        <Button
          size="xl"
          variant="ghost"
          onClick={() =>
            setStandout({
              type: StandoutType.OrganizationCreate,
              redirectUrl: routes.internal.closet.href(),
            })
          }
          endIcon={<PlusIcon className="w-5 h-5" />}
        >
          Create new account
        </Button>

        <a
          href={routes.internal.logout.href()}
          className="text-center text-sm mt-2"
        >
          Not you? Logout
        </a>
      </div>
    </>
  )
}

const OrganizationButton = ({
  membership,
  onClick,
  displayRole,
}: {
  membership: ViewerMembershipsIndexPageGetDataQuer['userMemberships'][number]
  onClick: () => Promise<void>
  displayRole?: boolean
}) => {
  const [loading, setLoading] = React.useState(false)

  const { organization } = membership
  if (!organization) return null

  const handleSubmit = async () => {
    setLoading(true)
    await onClick()
    setLoading(false)
  }

  return (
    <button
      className="w-full rounded-md border border-gray-200 py-2 px-4 flex items-center justify-between gap-2 hover:bg-gray-50"
      onClick={handleSubmit}
    >
      <div className="flex flex-col items-start">
        <span className="font-medium">{organization.name}</span>
        {displayRole && membership.humanizedRole ? (
          <span className="text-gray-400 text-sm">
            {membership.humanizedRole}
          </span>
        ) : null}
      </div>

      {loading ? (
        <LoadingDots />
      ) : (
        <span className="text-gray-400 text-sm">Select</span>
      )}
    </button>
  )
}

const GET_DATA = gql`
  query ViewerMembershipsIndexPageGetDataQuer {
    # We may not have access to the viewer, but we can still check if the user has memberships
    userMemberships {
      id
      humanizedRole
      organization {
        id
        name
      }
    }
  }
`

export default ViewerMembershipsIndexPage
