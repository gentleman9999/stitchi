'use client'

import React, { Suspense, useTransition } from 'react'
import { notEmpty } from '@lib/utils/typescript'
import CatalogProductLegacy from '../../../../components/common/CatalogProductLegacy'
import CatalogProductSkeleton from './CatalogProductSkeleton'
import { InfiniteScrollContainer } from '@components/common'
import Link from 'next/link'
import {
  CatalogIndexPageGetDataQuery,
  CatalogIndexPageGetDataQueryVariables,
} from '@generated/types'
import CatalogProductGridContainer from './CatalogProductGridContainer'
import { GET_DATA } from './graphql'
import useSearch from './useSearch'
import useSort from './useSort'
import useActiveFilters from './useActiveFilters'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { mergeFilters } from './format-filters'
import deepEqual from 'deep-equal'

interface Props {
  // Filters all results to specific brand
  brandEntityId?: number
  // Filters all results to specific category
  categoryEntityId?: number
}

const CatalogProductGrid = ({ brandEntityId, categoryEntityId }: Props) => {
  const { sort } = useSort()
  const { search } = useSearch()
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!
  const [isFetchingMore, startFetchMoreTransition] = useTransition()
  const activeFilters = useActiveFilters()

  const after = searchParams.get('after')

  const filters = mergeFilters(
    { search, ...activeFilters },
    { brandEntityId, categoryEntityId },
  )

  const [prevFilters, setPrevFilters] = React.useState(filters)

  const { data, refetch, fetchMore } = useSuspenseQuery<
    CatalogIndexPageGetDataQuery,
    CatalogIndexPageGetDataQueryVariables
  >(GET_DATA, {
    fetchPolicy: 'cache-and-network',
    variables: {
      first: 24,
      sort: sort.value,
      after: after || undefined,
      filters,
    },
  })

  React.useEffect(() => {
    if (!deepEqual(filters, prevFilters)) {
      refetch({
        filters,
      })
      setPrevFilters(filters)
    }
  }, [filters, prevFilters, refetch])

  const { products: productResult } = data?.site?.search?.searchProducts || {}

  const products =
    productResult?.edges?.map(edge => edge?.node).filter(notEmpty) || []

  const { pageInfo } = productResult || {}

  const handleFetchMore = () => {
    if (pageInfo?.hasNextPage && pageInfo.endCursor) {
      startFetchMoreTransition(async () => {
        fetchMore({
          variables: {
            after: pageInfo.endCursor,
          },
        })
      })
    }
  }

  if (after) {
    handleFetchMore()

    // Remove 'after' query param
    const newParams = new URLSearchParams(searchParams)
    newParams.delete('after')

    replace(pathname + '?' + newParams.toString())
  }

  return (
    <>
      <CatalogProductGridContainer>
        {products.map((product, i) =>
          product.id ? (
            <CatalogProductLegacy
              key={product.id}
              productId={product.id}
              priority={i < 6}
            />
          ) : null,
        )}

        {isFetchingMore
          ? Array.from(new Array(6)).map((_, i) => (
              <CatalogProductSkeleton key={i} />
            ))
          : null}
      </CatalogProductGridContainer>

      <InfiniteScrollContainer onIntersect={handleFetchMore} />

      {pageInfo?.hasNextPage && (
        <Link
          replace
          href={{ query: { after: pageInfo?.endCursor } }}
          className="sr-only"
        >
          Next
        </Link>
      )}
    </>
  )
}

export default CatalogProductGrid
