import { gql, useQuery } from '@apollo/client'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import {
  ClosetTabAllDesignRequestsGetDataQuery,
  ClosetTabAllDesignRequestsGetDataQueryVariables,
} from '@generated/ClosetTabAllDesignRequestsGetDataQuery'
import { notEmpty } from '@lib/utils/typescript'
import React from 'react'
import { useCloset } from '../closet-context'
import ClosetDesignIndexPageDesignRequestCard from '../ClosetDesignIndexPageDesignRequestCard'
import Carousel from './Carousel'

interface Props {}

const ClosetTabAllDesignRequests = ({}: Props) => {
  const { filters } = useCloset()

  const { data, refetch } = useQuery<
    ClosetTabAllDesignRequestsGetDataQuery,
    ClosetTabAllDesignRequestsGetDataQueryVariables
  >(GET_DATA, {
    variables: {
      first: 10,
      filter: {
        where: {
          userId: { equals: filters.user || undefined },
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
          userId: { equals: filters.user || undefined },
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

  return (
    <ClosetSection>
      <ClosetSectionHeader>
        <ClosetSectionTitle title="Design Requests" />
      </ClosetSectionHeader>

      <Carousel>
        <div className="flex gap-6">
          {designRequests.map(designRequest => (
            <div className="w-[230px] shrink-0 flex" key={designRequest.id}>
              <ClosetDesignIndexPageDesignRequestCard
                designRequest={designRequest}
              />
            </div>
          ))}
        </div>
      </Carousel>
    </ClosetSection>
  )
}

const GET_DATA = gql`
  ${ClosetDesignIndexPageDesignRequestCard.fragments.designRequest}

  query ClosetTabAllDesignRequestsGetDataQuery(
    $first: Int!
    $after: String
    $filter: MembershipDesignRequestsFilterInput
  ) {
    viewer {
      id
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

export default ClosetTabAllDesignRequests
