import React from 'react'
import { gql, NetworkStatus, useQuery } from '@apollo/client'
import {
  CatalogIndexPageGetDataQuery,
  CatalogIndexPageGetDataQueryVariables,
} from '@generated/CatalogIndexPageGetDataQuery'
import { SearchProductsFiltersInput } from '@generated/globalTypes'
import { useRouter } from 'next/router'
import CatalogFilters from './CatalogFilters'
import CatalogProductGrid from './CatalogProductGrid'
import useActiveFilters from './useActiveFilters'

export const makeDefaultQueryVariables = ({
  brandEntityId,
  categoryEntityId,
}: {
  brandEntityId?: number
  categoryEntityId?: number
} = {}) => ({
  first: 16,
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
  const { brands, categories } = useActiveFilters()

  // const brands: number[] = []
  // const categories: number[] = []

  const defaultFilters = makeDefaultQueryVariables({
    brandEntityId,
    categoryEntityId,
  }).filters

  const formattedFilters: SearchProductsFiltersInput = React.useMemo(
    () => ({
      ...makeDefaultQueryVariables({ brandEntityId, categoryEntityId }).filters,
      brandEntityIds: brands?.length ? brands : defaultFilters.brandEntityIds,
      categoryEntityIds: categories?.length
        ? categories
        : defaultFilters.categoryEntityIds,
    }),
    [
      brandEntityId,
      brands,
      categories,
      categoryEntityId,
      defaultFilters.brandEntityIds,
      defaultFilters.categoryEntityIds,
    ],
  )

  const { data, refetch, networkStatus, fetchMore } = useQuery<
    CatalogIndexPageGetDataQuery,
    CatalogIndexPageGetDataQueryVariables
  >(GET_DATA, {
    notifyOnNetworkStatusChange: true,
    variables: {
      ...makeDefaultQueryVariables({ brandEntityId, categoryEntityId }),
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
    <div>
      <CatalogFilters
        catalogEndRef={gridEndRef}
        brandEntityId={brandEntityId}
        categoryEntityId={categoryEntityId}
      />

      <div className="mt-4 grid grid-cols-1 gap-10">
        <div className="col-span-1">
          <CatalogProductGrid
            fetchMore={fetchMore}
            site={data?.site}
            loading={networkStatus !== NetworkStatus.ready}
          />
        </div>
      </div>
      <div ref={gridEndRef} />
    </div>
  )
}

export const GET_DATA = gql`
  ${CatalogProductGrid.fragments.site}
  query CatalogIndexPageGetDataQuery(
    $filters: SearchProductsFiltersInput!
    $first: Int!
    $after: String
  ) {
    site {
      ...CatalogProductGridSiteFragment
    }
  }
`

export default Catalog
