'use client'

import React, { useTransition } from 'react'
import { useBackgroundQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import {
  CatalogIndexPageGetDataQuery,
  CatalogIndexPageGetDataQueryVariables,
  SearchProductsFiltersInput,
} from '@generated/types'
import CatalogProductGrid from '../CatalogProductGrid'
import { GET_DATA, makeDefaultQueryVariables } from '../graphql'
import useSearch from '../useSearch'
import useSort from '../useSort'

interface Props {
  // Filters all results to specific brand
  brandEntityId?: number
  // Filters all results to specific category
  categoryEntityId?: number
}

const Page = ({ brandEntityId, categoryEntityId }: Props) => {
  const { replace } = useRouter()
  const pathname = usePathname()!
  const searchParams = useSearchParams()!
  const { brands, categories, collections, fabrics, fits } = useActiveFilters()
  const { sort } = useSort()
  const { search } = useSearch()

  const [isFetchingMore, startFetchMoreTransition] = useTransition()

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

  const [queryRef, { refetch, fetchMore }] = useBackgroundQuery<
    CatalogIndexPageGetDataQuery,
    CatalogIndexPageGetDataQueryVariables
  >(GET_DATA, {
    // notifyOnNetworkStatusChange: true,
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
      fetchMore({
        variables: { after },
      })

      const newParams = new URLSearchParams(searchParams)
      newParams.delete('after')

      replace(pathname + '?' + newParams.toString())
    }
  }, [fetchMore, replace, after, searchParams, pathname])

  const handleFetchMore = async (endCursor?: string | null) => {
    startFetchMoreTransition(async () => {
      if (endCursor) {
        fetchMore({
          variables: {
            after: endCursor,
          },
        })
      }
    })
  }

  return null

  return (
    <CatalogProductGrid
      queryRef={queryRef}
      fetchMore={handleFetchMore}
      isPending={isFetchingMore}
    />
  )
}

export default Page
