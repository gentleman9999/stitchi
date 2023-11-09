'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import {
  ClosetTabApprovedDesignRequestGetDataQuery,
  ClosetTabApprovedDesignRequestGetDataQueryVariables,
} from '@generated/ClosetTabApprovedDesignRequestGetDataQuery'
import { notEmpty } from '@lib/utils/typescript'
import React from 'react'
import { useCloset } from '../../closet-context'
import Carousel from '../Carousel'
import EmptyState from '../EmptyState'
import ClosetDesignIndexPageDesignRequestCard from '../../ClosetDesignIndexPageDesignRequestCard'
import { DesignRequestStatus } from '@generated/globalTypes'

interface Props {}

const ClosetTabApprovedDesignRequests = ({}: Props) => {
  const { filters } = useCloset()

  const { data, refetch } = useSuspenseQuery<
    ClosetTabApprovedDesignRequestGetDataQuery,
    ClosetTabApprovedDesignRequestGetDataQueryVariables
  >(GET_DATA, {
    fetchPolicy: 'cache-and-network',
    variables: {
      first: 10,
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

  const designRequests =
    data.viewer?.designRequests.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  return designRequests.length ? (
    <Carousel>
      <div className="flex gap-6">
        {designRequests.map(design => (
          <div key={design.id} className="w-[230px] shrink-0 flex">
            <ClosetDesignIndexPageDesignRequestCard
              designRequest={design}
              loading={false}
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
  query ClosetTabApprovedDesignRequestGetDataQuery(
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

export default ClosetTabApprovedDesignRequests
