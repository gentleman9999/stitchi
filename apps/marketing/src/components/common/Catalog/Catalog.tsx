'use client'

import React from 'react'
import { NetworkStatus, useApolloClient } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'

import { SearchProductsFiltersInput } from '@generated/globalTypes'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import CatalogFiltersV2 from './CatalogFiltersV2'
import CatalogProductGrid from './CatalogProductGrid'
import useActiveFilters from './useActiveFilters'
import Container from '@components/ui/Container'
import Section from '../Section'
import {
  CatalogIndexPageGetDataQuery,
  CatalogIndexPageGetDataQueryVariables,
} from '@generated/types'
import useSort from './useSort'
import useSearch from './useSearch'
import { GET_DATA, makeDefaultQueryVariables } from './graphql'

interface Props {
  // Filters all results to specific brand
  brandEntityId?: number
  // Filters all results to specific category
  categoryEntityId?: number
}

const Catalog = ({ brandEntityId, categoryEntityId }: Props) => {
  const { replace } = useRouter()
  const pathname = usePathname()!
  const searchParams = useSearchParams()!
  const gridEndRef = React.useRef<HTMLDivElement>(null)
  const { brands, categories, collections, fabrics, fits } = useActiveFilters()
  const { sort } = useSort()
  const { search } = useSearch()

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

  const client = useApolloClient()

  const { data, refetch, networkStatus, fetchMore } = useSuspenseQuery<
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

  return (
    <>
      <CatalogFiltersV2
        catalogEndRef={gridEndRef}
        brandEntityId={brandEntityId}
        categoryEntityId={categoryEntityId}
      />

      <Container className="max-w-none">
        <Section>
          <div className="mt-6 grid grid-cols-1 gap-10">
            <div className="col-span-1">
              <CatalogProductGrid
                site={data.site}
                fetchMore={fetchMore}
                loading={networkStatus !== NetworkStatus.ready}
              />
            </div>
          </div>
          <div ref={gridEndRef} />
        </Section>
      </Container>
    </>
  )
}

export default Catalog
