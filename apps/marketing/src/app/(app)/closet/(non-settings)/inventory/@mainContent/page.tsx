'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import ClosetCardGrid from '@components/common/ClosetCardGrid'
import ClosetPageEmptyState from '@components/common/ClosetPageEmptyState'
import {
  ClosetInventoryIndexPageInventoryListGetDataQuery,
  ClosetInventoryIndexPageInventoryListGetDataQueryVariables,
} from '@generated/ClosetInventoryIndexPageInventoryListGetDataQuery'
import routes from '@lib/routes'
import { notEmpty } from '@lib/utils/typescript'
import React from 'react'
import InventoryProductCard from './InventoryProductCard'

interface Props {}

const Page = ({}: Props) => {
  const { data } = useSuspenseQuery<
    ClosetInventoryIndexPageInventoryListGetDataQuery,
    ClosetInventoryIndexPageInventoryListGetDataQueryVariables
  >(GET_DATA, {
    fetchPolicy: 'cache-and-network',
    variables: {
      first: 16,
    },
  })

  const products =
    data?.viewer?.designProducts.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  return !data.viewer?.hasDesignProducts ? (
    <ClosetPageEmptyState
      title="You don't have any approved designs yet."
      description="Your approved designs will appear here."
      cta={{
        label: 'View in-progress designs',
        href: routes.internal.closet.designs.inProgress.href(),
      }}
    />
  ) : !products.length ? (
    <ClosetPageEmptyState
      title="No approved designs match your filters."
      description="Try adjusting your filters or resetting them to see more designs."
    />
  ) : (
    <ClosetCardGrid>
      {products.map(designProduct => (
        <InventoryProductCard
          key={designProduct.id}
          design={designProduct}
          loading={false}
        />
      ))}
    </ClosetCardGrid>
  )
}
const GET_DATA = gql`
  ${InventoryProductCard.fragments.designProduct}
  query ClosetInventoryIndexPageInventoryListGetDataQuery(
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
            ...ClosetInventoryIndexPageProductCardDesignProductFragment
          }
        }
      }
    }
  }
`

export default Page
