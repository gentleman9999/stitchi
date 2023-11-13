import React from 'react'
import { gql, NetworkStatus, useQuery } from '@apollo/client'

import { SearchProductsFiltersInput } from '@generated/globalTypes'
import { useRouter } from 'next/router'
import CatalogFilters from './CatalogFilters'
import CatalogFiltersV2 from './CatalogFiltersV2'
import CatalogProductGrid from './CatalogProductGrid'
import useActiveFilters from './useActiveFilters'
import Container from '@components/ui/Container'
import Section from '../Section'
import {
  CatalogIndexPageGetDataQuery,
  CatalogIndexPageGetDataQueryVariables,
  SearchProductsSortInput,
} from '@generated/types'
import useSort from './useSort'
import useSearch from './useSearch'

export const makeDefaultQueryVariables = ({
  brandEntityId,
  categoryEntityId,
}: {
  brandEntityId?: number
  categoryEntityId?: number
} = {}) => ({
  first: 16,
  sort: SearchProductsSortInput.RELEVANCE,
  filters: {
    brandEntityIds: brandEntityId ? [brandEntityId] : undefined,
    categoryEntityIds: categoryEntityId ? [categoryEntityId] : undefined,
    searchSubCategories: true,
  },
})

interface Props {
  // Filters all results to specific brand
  brandEntityId?: number
  // Filters all results to specific category
  categoryEntityId?: number
}

const Catalog = ({ brandEntityId, categoryEntityId }: Props) => {
  const { query, replace } = useRouter()
  const gridEndRef = React.useRef<HTMLDivElement>(null)
  const { brands, categories, collections, fabrics, fits } = useActiveFilters()
  const { sort } = useSort()
  const { search } = useSearch()

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

  const { data, refetch, networkStatus, fetchMore } = useQuery<
    CatalogIndexPageGetDataQuery,
    CatalogIndexPageGetDataQueryVariables
  >(GET_DATA, {
    notifyOnNetworkStatusChange: true,
    variables: {
      ...defaultVariables,
      sort: sort?.value || defaultVariables.sort,
      after: typeof query.after === 'string' ? query.after : undefined,
      filters: formattedFilters,
    },
  })

  React.useEffect(() => {
    refetch({
      filters: formattedFilters,
    })
  }, [formattedFilters, refetch])

  React.useEffect(() => {
    const { after } = query
    if (typeof after === 'string') {
      fetchMore({
        variables: { after },
      })

      const newQuery = { ...query }
      delete newQuery.after

      replace({ query: newQuery })
    }
  }, [query, fetchMore, replace])

  return (
    <>
      {/* <CatalogFilters
        catalogEndRef={gridEndRef}
        brandEntityId={brandEntityId}
        categoryEntityId={categoryEntityId}
      /> */}
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
                fetchMore={fetchMore}
                site={data?.site}
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

export const GET_DATA = gql`
  ${CatalogProductGrid.fragments.site}
  query CatalogIndexPageGetDataQuery(
    $filters: SearchProductsFiltersInput!
    $sort: SearchProductsSortInput!
    $first: Int!
    $after: String
  ) {
    site {
      ...CatalogProductGridSiteFragment
    }
  }
`

export default Catalog
