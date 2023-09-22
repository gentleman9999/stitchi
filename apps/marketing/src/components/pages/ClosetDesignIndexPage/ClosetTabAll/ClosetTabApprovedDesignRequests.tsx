import { gql, useQuery } from '@apollo/client'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import {
  ClosetTabApprovedDesignRequestGetDataQuery,
  ClosetTabApprovedDesignRequestGetDataQueryVariables,
} from '@generated/ClosetTabApprovedDesignRequestGetDataQuery'
import { notEmpty } from '@lib/utils/typescript'
import React from 'react'
import { useCloset } from '../closet-context'
import Carousel from './Carousel'
import EmptyState from './EmptyState'
import ClosetDesignIndexPageDesignRequestCard from '../ClosetDesignIndexPageDesignRequestCard'
import { DesignRequestStatus } from '@generated/globalTypes'

interface Props {}

const ClosetTabApprovedDesignRequests = ({}: Props) => {
  const { filters } = useCloset()

  const { data, loading, refetch } = useQuery<
    ClosetTabApprovedDesignRequestGetDataQuery,
    ClosetTabApprovedDesignRequestGetDataQueryVariables
  >(GET_DATA, {
    variables: {
      first: 10,
      filter: {
        where: {
          membershipId: { equals: filters.user || undefined },
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

  const { viewer } = data || {}

  const designRequests =
    viewer?.designRequests.edges?.map(edge => edge?.node).filter(notEmpty) || []

  return (
    <ClosetSection>
      <ClosetSectionHeader>
        <ClosetSectionTitle title="Approved" />
      </ClosetSectionHeader>

      {loading || designRequests.length ? (
        <Carousel>
          <div className="flex gap-6">
            {loading ? (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="w-[230px] shrink-0 flex">
                    <ClosetDesignIndexPageDesignRequestCard
                      loading={true}
                      designRequest={null}
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                {designRequests.map(design => (
                  <div key={design.id} className="w-[230px] shrink-0 flex">
                    <ClosetDesignIndexPageDesignRequestCard
                      designRequest={design}
                      loading={false}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </Carousel>
      ) : (
        <EmptyState />
      )}
    </ClosetSection>
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
