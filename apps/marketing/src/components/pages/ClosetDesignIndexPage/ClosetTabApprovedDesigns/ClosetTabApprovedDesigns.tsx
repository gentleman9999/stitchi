import { gql, useQuery } from '@apollo/client'
import ClosetPageEmptyState from '@components/common/ClosetPageEmptyState'
import {
  ClosetTabApprovedDesignsGetDataQuery,
  ClosetTabApprovedDesignsGetDataQueryVariables,
} from '@generated/ClosetTabApprovedDesignsGetDataQuery'
import routes from '@lib/routes'
import { notEmpty } from '@lib/utils/typescript'
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

  return !loading && !data?.viewer?.hasDesignProducts ? (
    <ClosetPageEmptyState
      title="You don't have any approved designs yet."
      description="Your approved designs will appear here."
      cta={{
        label: 'View design requests',
        href: routes.internal.closet.designRequests.href(),
      }}
    />
  ) : !loading && !approvedDesigns?.length ? (
    <ClosetPageEmptyState
      title="No approved designs match your filters."
      description="Try adjusting your filters or resetting them to see more designs."
    />
  ) : (
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
      hasDesignProducts
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
