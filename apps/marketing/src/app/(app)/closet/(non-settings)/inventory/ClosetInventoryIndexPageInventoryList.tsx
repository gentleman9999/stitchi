'use client'

import { gql, NetworkStatus, useQuery } from '@apollo/client'
import ClosetCardGrid from '@components/common/ClosetCardGrid'
import ClosetPageEmptyState from '@components/common/ClosetPageEmptyState'
import {
  ClosetInventoryIndexPageInventoryListGetDataQuery,
  ClosetInventoryIndexPageInventoryListGetDataQueryVariables,
} from '@generated/ClosetInventoryIndexPageInventoryListGetDataQuery'
import routes from '@lib/routes'
import { notEmpty } from '@lib/utils/typescript'
import React from 'react'
import ClosetInventoryIndexPageProductCard from './ClosetInventoryIndexPageProductCard'

interface Props {}

const ClosetInventoryIndexPageInventoryList = ({}: Props) => {
  const { data, loading, networkStatus } = useQuery<
    ClosetInventoryIndexPageInventoryListGetDataQuery,
    ClosetInventoryIndexPageInventoryListGetDataQueryVariables
  >(GET_DATA, {
    fetchPolicy: 'cache-and-network',
    variables: {
      first: 16,
    },
  })

  const approvedDesigns = data?.viewer?.designProducts.edges
    ?.map(edge => edge?.node)
    .filter(notEmpty)

  return !loading && !data?.viewer?.hasDesignProducts ? (
    <ClosetPageEmptyState
      title="You don't have any approved designs yet."
      description="Your approved designs will appear here."
      cta={{
        label: 'View in-progress designs',
        href: routes.internal.closet.designs.inProgress.href(),
      }}
    />
  ) : !loading && !approvedDesigns?.length ? (
    <ClosetPageEmptyState
      title="No approved designs match your filters."
      description="Try adjusting your filters or resetting them to see more designs."
    />
  ) : (
    <ClosetCardGrid>
      {networkStatus === NetworkStatus.refetch ||
      networkStatus === NetworkStatus.loading ? (
        <>
          {Array.from({ length: 4 }).map((_, index) => (
            <ClosetInventoryIndexPageProductCard
              key={index}
              design={null}
              loading={true}
            />
          ))}
        </>
      ) : (
        <>
          {approvedDesigns?.map(design => (
            <ClosetInventoryIndexPageProductCard
              key={design.id}
              design={design}
              loading={false}
            />
          ))}
        </>
      )}
    </ClosetCardGrid>
  )
}

const GET_DATA = gql`
  ${ClosetInventoryIndexPageProductCard.fragments.designProduct}
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

export default ClosetInventoryIndexPageInventoryList
