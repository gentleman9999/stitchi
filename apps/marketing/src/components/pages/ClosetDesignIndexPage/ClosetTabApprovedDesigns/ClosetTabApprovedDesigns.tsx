import { gql, useQuery } from '@apollo/client'
import {
  ClosetTabApprovedDesignsGetDataQuery,
  ClosetTabApprovedDesignsGetDataQueryVariables,
} from '@generated/ClosetTabApprovedDesignsGetDataQuery'
import { notEmpty } from '@utils/typescript'
import React from 'react'
import CardGrid from '../CardGrid'
import { useCloset } from '../closet-context'
import ClosetDesignIndexPageApprovedDesignCard from '../ClosetDesignIndexPageApprovedDesignCard'

interface Props {}

const ClosetTabApprovedDesigns = ({}: Props) => {
  const { filters } = useCloset()

  const { data, loading, refetch } = useQuery<
    ClosetTabApprovedDesignsGetDataQuery,
    ClosetTabApprovedDesignsGetDataQueryVariables
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

  const approvedDesigns = data?.viewer?.designProducts.edges
    ?.map(edge => edge?.node)
    .filter(notEmpty)

  return (
    <CardGrid>
      {approvedDesigns?.map(design => (
        <ClosetDesignIndexPageApprovedDesignCard
          key={design.id}
          design={design}
        />
      ))}
    </CardGrid>
  )
}

const GET_DATA = gql`
  ${ClosetDesignIndexPageApprovedDesignCard.fragments.designProduct}
  query ClosetTabApprovedDesignsGetDataQuery(
    $first: Int!
    $after: String
    $filter: MembershipDesignProductsFilterInput
  ) {
    viewer {
      id
      designProducts(first: $first, after: $after, filter: $filter) {
        edges {
          node {
            id
            ...ClosetDesignIndexPageApprovedDesignCardDesignProductFragment
          }
        }
      }
    }
  }
`

export default ClosetTabApprovedDesigns
