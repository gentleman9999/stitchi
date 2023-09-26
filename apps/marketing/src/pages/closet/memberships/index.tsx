import { gql, useQuery } from '@apollo/client'
import useSetUserMembership from '@components/hooks/useSetUserMembership'
import { LoadingDots, Logo } from '@components/ui'
import {
  ViewerMembershipsIndexPageGetDataQuer,
  ViewerMembershipsIndexPageGetDataQuer_viewer_user_memberships,
} from '@generated/ViewerMembershipsIndexPageGetDataQuer'
import { addApolloState, initializeApollo } from '@lib/apollo'
import routes from '@lib/routes'
import { notEmpty } from '@lib/utils/typescript'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

export const getServerSideProps: GetServerSideProps = async ctx => {
  const client = initializeApollo(undefined, ctx)

  await client.query<ViewerMembershipsIndexPageGetDataQuer>({
    query: GET_DATA,
  })

  return addApolloState(client, { props: {} })
}

const ViewerMembershipsIndexPage = () => {
  const router = useRouter()
  const { data, loading } =
    useQuery<ViewerMembershipsIndexPageGetDataQuer>(GET_DATA)

  const [setMembership] = useSetUserMembership()

  const { memberships } = data?.viewer?.user || {}

  React.useEffect(() => {
    if (!loading && !memberships?.length) {
      router.push(
        routes.internal.account.setup.href({
          redirectUrl: routes.internal.closet.href(),
        }),
      )
    }
  }, [loading, memberships?.length, router])

  const { redirectUrl } = router.query

  const nextPath =
    typeof redirectUrl === 'string'
      ? redirectUrl
      : routes.internal.closet.href()

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
    <div className="w-full min-h-screen flex items-center justify-center bg-primary p-4">
      <div className="w-full max-w-sm min-h-[400px] border-md bg-paper shadow-xl flex flex-col gap-8 p-8 rounded-lg items-center justify-center">
        <Logo className="w-16" />

        <h2 className="text-xl font-semibold text-gray-800">
          Select an organization
        </h2>

        {loading ? (
          <div className="w-full flex justify-center items-center flex-1">
            <LoadingDots />
          </div>
        ) : (
          <>
            <div className="flex flex-1 flex-col gap-2 w-full">
              {memberships?.map(membership => {
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
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const OrganizationButton = ({
  membership,
  onClick,
  displayRole,
}: {
  membership: ViewerMembershipsIndexPageGetDataQuer_viewer_user_memberships
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
    viewer {
      id
      user {
        id
        memberships {
          id
          humanizedRole
          organization {
            id
            name
          }
        }
      }
    }
  }
`

export default ViewerMembershipsIndexPage
