import { gql, useQuery } from '@apollo/client'
import {
  ClosetTabDesignRequestsGetDataQuery,
  ClosetTabDesignRequestsGetDataQueryVariables,
} from '@generated/ClosetTabDesignRequestsGetDataQuery'
import { notEmpty } from '@utils/typescript'
import React from 'react'
import CardGrid from '../CardGrid'
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
    <CardGrid>
      {designRequests.map(designRequest => (
        <ClosetDesignIndexPageDesignRequestCard
          key={designRequest.id}
          designRequest={designRequest}
        />
      ))}
    </CardGrid>
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
