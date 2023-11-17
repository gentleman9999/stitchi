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
  SearchProductsFiltersInput,
} from '@generated/types'
import CatalogProductGridContainer from './CatalogProductGridContainer'
import { GET_DATA, makeDefaultQueryVariables } from './graphql'
import useSearch from './useSearch'
import useSort from './useSort'
import useActiveFilters from './useActiveFilters'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'

interface Props {
  // Filters all results to specific brand
  brandEntityId?: number
  // Filters all results to specific category
  categoryEntityId?: number
}

const CatalogProductGrid = ({ brandEntityId, categoryEntityId }: Props) => {
  const { replace } = useRouter()
  const { sort } = useSort()
  const { search } = useSearch()
  const pathname = usePathname()!
  const searchParams = useSearchParams()!
  const [isFetchingMore, startFetchMoreTransition] = useTransition()
  const { brands, categories, collections, fabrics, fits } = useActiveFilters()

  const after = searchParams.get('after')

  const defaultVariables = React.useMemo(() => {
    return makeDefaultQueryVariables({
      brandEntityId,
      categoryEntityId,
    })
  }, [brandEntityId, categoryEntityId])

  const formattedFilters: SearchProductsFiltersInput = React.useMemo(() => {
    return {
      ...defaultVariables.filters,
      searchTerm: search,
      brandEntityIds: brands?.length
        ? brands
        : defaultVariables.filters.brandEntityIds,
      categoryEntityIds:
        categories?.length ||
        collections?.length ||
        fabrics?.length ||
        fits?.length
          ? [
              ...(categories || []),
              ...(collections || []),
              ...(fabrics || []),
              ...(fits || []),
            ]
          : defaultVariables.filters.categoryEntityIds,
    }
  }, [
    brands,
    categories,
    collections,
    defaultVariables.filters,
    fabrics,
    fits,
    search,
  ])

  const { data, refetch, fetchMore } = useSuspenseQuery<
    CatalogIndexPageGetDataQuery,
    CatalogIndexPageGetDataQueryVariables
  >(GET_DATA, {
    fetchPolicy: 'cache-and-network',
    returnPartialData: true,
    variables: {
      ...defaultVariables,
      sort: sort?.value || defaultVariables.sort,
      after: after || undefined,
      filters: formattedFilters,
    },
  })

  React.useEffect(() => {
    refetch({
      filters: formattedFilters,
    })
  }, [formattedFilters, refetch])

  React.useEffect(() => {
    if (after) {
      startFetchMoreTransition(async () => {
        fetchMore({
          variables: { after },
        })
      })

      const newParams = new URLSearchParams(searchParams)
      newParams.delete('after')

      replace(pathname + '?' + newParams.toString())
    }
  }, [fetchMore, replace, after, searchParams, pathname])

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

  const products =
    data?.site?.search?.searchProducts?.products?.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  const { pageInfo } = data?.site?.search?.searchProducts?.products || {}

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
