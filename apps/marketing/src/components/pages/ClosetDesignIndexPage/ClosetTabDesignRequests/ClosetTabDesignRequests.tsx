import { gql, useQuery } from '@apollo/client'
import ClosetCardGrid from '@components/common/ClosetCardGrid'
import ClosetPageEmptyState from '@components/common/ClosetPageEmptyState'
import {
  ClosetTabDesignRequestsGetDataQuery,
  ClosetTabDesignRequestsGetDataQueryVariables,
} from '@generated/ClosetTabDesignRequestsGetDataQuery'
import { DesignRequestStatus } from '@generated/globalTypes'
import routes from '@lib/routes'
import { notEmpty } from '@lib/utils/typescript'
import React from 'react'
import { useCloset } from '../closet-context'
import ClosetDesignIndexPageDesignRequestCard from '../ClosetDesignIndexPageDesignRequestCard'

interface Props {}

const ClosetTabDesignRequests = ({}: Props) => {
  const { filters } = useCloset()

  const { data, loading, refetch } = useQuery<
    ClosetTabDesignRequestsGetDataQuery,
    ClosetTabDesignRequestsGetDataQueryVariables
  >(GET_DATA, {
    fetchPolicy: 'cache-and-network',
    variables: {
      first: 16,
      filter: {
        where: {
          membershipId: { equals: filters.user || undefined },
          status: {
            notIn: [DesignRequestStatus.APPROVED],
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
          status: {
            notIn: [DesignRequestStatus.APPROVED],
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
    data?.viewer?.designRequests.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  return !loading && !data?.viewer?.hasDesignRequests ? (
    <ClosetPageEmptyState
      title="You haven't submitted a design request yet."
      description="Submit a design request to begin your merch journey."
      cta={{
        label: 'New design request',
        href: routes.internal.closet.designRequests.create.href(),
      }}
    />
  ) : !loading && !designRequests?.length ? (
    <ClosetPageEmptyState
      title="No design requests match your filters."
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
          {designRequests.map(designRequest => (
            <ClosetDesignIndexPageDesignRequestCard
              key={designRequest.id}
              designRequest={designRequest}
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
  query ClosetTabDesignRequestsGetDataQuery(
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

export default ClosetTabDesignRequests
