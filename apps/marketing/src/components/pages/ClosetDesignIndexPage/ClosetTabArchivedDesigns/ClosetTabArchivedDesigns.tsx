import { gql, useQuery } from '@apollo/client'
import ClosetPageEmptyState from '@components/common/ClosetPageEmptyState'

import routes from '@lib/routes'
import { notEmpty } from '@lib/utils/typescript'
import React from 'react'
import { useCloset } from '../closet-context'
import ClosetCardGrid from '@components/common/ClosetCardGrid'
import ClosetDesignIndexPageDesignRequestCard from '../ClosetDesignIndexPageDesignRequestCard'
import { DesignRequestStatus } from '@generated/globalTypes'
import {
  ClosetTabArchivedDesignsGetDataQuery,
  ClosetTabArchivedDesignsGetDataQueryVariables,
} from '@generated/types'

interface Props {}

const ClosetTabArchivedDesigns = ({}: Props) => {
  const { filters } = useCloset()

  const { data, loading, refetch } = useQuery<
    ClosetTabArchivedDesignsGetDataQuery,
    ClosetTabArchivedDesignsGetDataQueryVariables
  >(GET_DATA, {
    fetchPolicy: 'cache-and-network',
    variables: {
      first: 16,
      filter: {
        where: {
          membershipId: { equals: filters.user || undefined },
          artistMembershipId: { equals: filters.artist || undefined },
          status: {
            in: [DesignRequestStatus.REJECTED],
          },
          createdAt: {
            gte: filters.date?.gte,
            lte: filters.date?.lte,
          },
        },
      },
    },
  })

  React.useEffect(() => {
    refetch({
      filter: {
        where: {
          membershipId: { equals: filters.user || undefined },
          artistMembershipId: { equals: filters.artist || undefined },
          status: {
            in: [DesignRequestStatus.REJECTED],
          },
          createdAt: {
            gte: filters.date?.gte,
            lte: filters.date?.lte,
          },
        },
      },
    })
  }, [filters, refetch])

  const approvedDesigns = data?.viewer?.designRequests.edges
    ?.map(edge => edge?.node)
    .filter(notEmpty)

  return !loading && !data?.viewer?.hasDesignProducts ? (
    <ClosetPageEmptyState
      title="You don't have any approved designs yet."
      description="Your approved designs will appear here."
      cta={{
        label: 'View in-progress designs',
        href: routes.internal.closet.designs.inProgress.href(),
      }}
    />
  ) : !loading && !approvedDesigns?.length ? (
    <ClosetPageEmptyState
      title="No approved designs match your filters."
      description="Try adjusting your filters or resetting them to see more designs."
    />
  ) : (
    <ClosetCardGrid>
      {loading ? (
        <>
          {Array.from({ length: 4 }).map((_, index) => (
            <ClosetDesignIndexPageDesignRequestCard
              key={index}
              designRequest={null}
              loading={true}
            />
          ))}
        </>
      ) : (
        <>
          {approvedDesigns?.map(design => (
            <ClosetDesignIndexPageDesignRequestCard
              key={design.id}
              designRequest={design}
              loading={false}
            />
          ))}
        </>
      )}
    </ClosetCardGrid>
  )
}

const GET_DATA = gql`
  ${ClosetDesignIndexPageDesignRequestCard.fragments.designRequest}
  query ClosetTabArchivedDesignsGetDataQuery(
    $first: Int!
    $after: String
    $filter: MembershipDesignRequestsFilterInput
  ) {
    viewer {
      id
      hasDesignProducts
      designRequests(first: $first, after: $after, filter: $filter) {
        edges {
          node {
            id
            ...ClosetDesignIndexPageDesignRequestCardDesignRequestFragment
          }
        }
      }
    }
  }
`

export default ClosetTabArchivedDesigns
