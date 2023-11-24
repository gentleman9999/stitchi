'use client'

import React, { useTransition } from 'react'
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { mergeFilters } from './format-filters'
import deepEqual from 'deep-equal'
import { useFilters } from './filters-context'
import routes from '@lib/routes'

const CatalogProductGrid = () => {
  const { replace } = useRouter()
  const pathname = usePathname()!
  const searchParams = useSearchParams()!
  const [isFetchingMore, startFetchMoreTransition] = useTransition()
  const { filters: unmergedFilters, search, sort } = useFilters()

  const isCloset = pathname.startsWith('/closet')

  const after = searchParams.get('after')

  const filters = mergeFilters({
    search,
    brands: unmergedFilters.brands.map(({ id }) => id),
    categories: unmergedFilters.categories.map(({ entityId }) => entityId),
    collections: unmergedFilters.collections.map(({ entityId }) => entityId),
    fabrics: unmergedFilters.fabrics.map(({ entityId }) => entityId),
    fits: unmergedFilters.fits.map(({ entityId }) => entityId),
  })

  const [prevFilters, setPrevFilters] = React.useState(filters)

  const { data, refetch, fetchMore } = useSuspenseQuery<
    CatalogIndexPageGetDataQuery,
    CatalogIndexPageGetDataQueryVariables
  >(GET_DATA, {
    variables: {
      first: 24,
      sort: sort.value,
      after: after || undefined,
      filters,
    },
  })

  React.useEffect(() => {
    if (!deepEqual(filters, prevFilters)) {
      refetch({ filters })
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

  const catalogRoutes = isCloset
    ? routes.internal.closet.catalog
    : routes.internal.catalog

  return (
    <>
      <CatalogProductGridContainer>
        {products.map((product, i) =>
          product.id ? (
            <CatalogProductLegacy
              key={product.id}
              productId={product.id}
              priority={i < 6}
              href={catalogRoutes.product.href({
                brandSlug: product.brand?.path || '',
                productSlug: product.path,
              })}
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