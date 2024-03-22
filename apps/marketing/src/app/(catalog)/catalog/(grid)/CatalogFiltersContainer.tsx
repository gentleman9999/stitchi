import React from 'react'
import CatalogFiltersSidebar from './CatalogFiltersSidebar'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import {
  CatalogFiltersContainerGetDataQuery,
  CatalogFiltersContainerGetDataQueryVariables,
} from '@generated/types'
import { SetValues, UseQueryStatesKeysMap } from 'nuqs'
import { QueryStates } from './CatalogProductsListPage'

interface Props {
  variables: CatalogFiltersContainerGetDataQueryVariables
  setQueryStates: SetValues<UseQueryStatesKeysMap<QueryStates>>
  defaultBrandEntityId?: number
}

const CatalogFiltersContainer = ({
  variables,
  setQueryStates,
  defaultBrandEntityId,
}: Props) => {
  const { data } = useSuspenseQuery<
    CatalogFiltersContainerGetDataQuery,
    CatalogFiltersContainerGetDataQueryVariables
  >(GET_DATA, { variables })

  const filters = data.site.search.searchProducts.filters

  return (
    <aside className="hidden lg:block w-64">
      <CatalogFiltersSidebar
        filters={filters}
        defaultBrandEntityId={defaultBrandEntityId}
        setFilters={setQueryStates}
      />
    </aside>
  )
}

const GET_DATA = gql`
  ${CatalogFiltersSidebar.fragments.filters}

  query CatalogFiltersContainerGetDataQuery(
    $filters: SearchProductsFiltersInput!
    $sort: SearchProductsSortInput!
  ) {
    site {
      search {
        searchProducts(filters: $filters, sort: $sort) {
          filters(first: 50) {
            ...CatalogFiltersSidebarFiltersFragment
          }
        }
      }
    }
  }
`

export default CatalogFiltersContainer
