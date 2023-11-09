'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import { DesignRequestStatus } from '@generated/globalTypes'
import { notEmpty } from '@lib/utils/typescript'
import React from 'react'
import { useCloset } from '../../closet-context'
import ClosetDesignIndexPageDesignRequestCard from '../../ClosetDesignIndexPageDesignRequestCard'
import Carousel from '../Carousel'
import EmptyState from '../EmptyState'
import {
  ClosetTabInProgressDesignRequestsGetDataQuery,
  ClosetTabInProgressDesignRequestsGetDataQueryVariables,
} from '@generated/types'

interface Props {}

const ClosetTabInProgressDesignRequests = ({}: Props) => {
  const { filters } = useCloset()

  const { data, refetch } = useSuspenseQuery<
    ClosetTabInProgressDesignRequestsGetDataQuery,
    ClosetTabInProgressDesignRequestsGetDataQueryVariables
  >(GET_DATA, {
    fetchPolicy: 'cache-and-network',
    variables: {
      first: 10,
      filter: {
        where: {
          membershipId: { equals: filters.user || undefined },
          artistMembershipId: { equals: filters.artist || undefined },
          status: {
            in: [
              DesignRequestStatus.AWAITING_APPROVAL,
              DesignRequestStatus.AWAITING_REVISION,
              DesignRequestStatus.SUBMITTED,
            ],
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
            in: [
              DesignRequestStatus.AWAITING_APPROVAL,
              DesignRequestStatus.AWAITING_REVISION,
              DesignRequestStatus.SUBMITTED,
            ],
          },
          createdAt: {
            gte: filters.date?.gte,
            lte: filters.date?.lte,
          },
        },
      },
    })
  }, [filters, refetch])

  const designRequests =
    data.viewer?.designRequests.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  return designRequests.length ? (
    <Carousel>
      <div className="flex gap-6">
        {designRequests.map(designRequest => (
          <div key={designRequest.id} className="w-[230px] shrink-0 flex">
            <ClosetDesignIndexPageDesignRequestCard
              designRequest={designRequest}
            />
          </div>
        ))}
      </div>
    </Carousel>
  ) : (
    <EmptyState />
  )
}

const GET_DATA = gql`
  ${ClosetDesignIndexPageDesignRequestCard.fragments.designRequest}

  query ClosetTabInProgressDesignRequestsGetDataQuery(
    $first: Int!
    $after: String
    $filter: MembershipDesignRequestsFilterInput
  ) {
    viewer {
      id
      hasDesignRequests
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

export default ClosetTabInProgressDesignRequests
