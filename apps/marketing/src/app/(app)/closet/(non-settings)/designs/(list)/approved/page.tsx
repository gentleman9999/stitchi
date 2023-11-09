'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import ClosetPageEmptyState from '@components/common/ClosetPageEmptyState'
import {
  ClosetTabApprovedDesignsGetDataQuery,
  ClosetTabApprovedDesignsGetDataQueryVariables,
} from '@generated/ClosetTabApprovedDesignsGetDataQuery'
import routes from '@lib/routes'
import { notEmpty } from '@lib/utils/typescript'
import React from 'react'
import { useCloset } from '../closet-context'
import ClosetCardGrid from '@components/common/ClosetCardGrid'
import ClosetDesignIndexPageDesignRequestCard from '../ClosetDesignIndexPageDesignRequestCard'
import { DesignRequestStatus } from '@generated/globalTypes'

interface Props {}

const ClosetTabApprovedDesigns = ({}: Props) => {
  const { filters } = useCloset()

  const { data, refetch } = useSuspenseQuery<
    ClosetTabApprovedDesignsGetDataQuery,
    ClosetTabApprovedDesignsGetDataQueryVariables
  >(GET_DATA, {
    fetchPolicy: 'cache-and-network',
    variables: {
      first: 16,
      filter: {
        where: {
          membershipId: { equals: filters.user || undefined },
          artistMembershipId: { equals: filters.artist || undefined },
          status: {
            equals: DesignRequestStatus.APPROVED,
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
            equals: DesignRequestStatus.APPROVED,
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

  if (!data.viewer?.hasDesignProducts) {
    return (
      <ClosetPageEmptyState
        title="You don't have any approved designs yet."
        description="Your approved designs will appear here."
        cta={{
          label: 'View in-progress designs',
          href: routes.internal.closet.designs.inProgress.href(),
        }}
      />
    )
  }

  if (!approvedDesigns?.length) {
    return (
      <ClosetPageEmptyState
        title="No approved designs match your filters."
        description="Try adjusting your filters or resetting them to see more designs."
      />
    )
  }

  return (
    <ClosetCardGrid>
      {approvedDesigns?.map(design => (
        <ClosetDesignIndexPageDesignRequestCard
          key={design.id}
          designRequest={design}
        />
      ))}
    </ClosetCardGrid>
  )
}

const GET_DATA = gql`
  ${ClosetDesignIndexPageDesignRequestCard.fragments.designRequest}
  query ClosetTabApprovedDesignsGetDataQuery(
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

export default ClosetTabApprovedDesigns
