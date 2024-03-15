import React from 'react'
import CatalogFiltersSidebar from './CatalogFiltersSidebar'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import {
  CatalogFiltersContainerGetDataQuery,
  CatalogFiltersContainerGetDataQueryVariables,
  CatalogProductGridQueryVariables,
} from '@generated/types'
import { SetValues, UseQueryStatesKeysMap } from 'nuqs'
import {
  QueryStates,
  useCatalogQueryStates,
} from './catalog-query-states-context'

interface Props {}

const CatalogFiltersContainer = ({}: Props) => {
  const { variables, setQueryStates } = useCatalogQueryStates()

  const { data, refetch } = useSuspenseQuery<
    CatalogFiltersContainerGetDataQuery,
    CatalogFiltersContainerGetDataQueryVariables
  >(GET_DATA, {
    variables: {
      filters: variables.filters,
      sort: variables.sort,
    },
  })

  const { filters } = data?.site.search.searchProducts || {}

  const memoizedVariables = React.useMemo(
    () => ({
      filters: variables.filters,
      sort: variables.sort,
    }),
    [variables.filters, variables.sort],
  )

  //   React.useEffect(() => {
  //     refetch(memoizedVariables)
  //   }, [memoizedVariables, refetch])

  return (
    <aside className="hidden lg:block w-64">
      <CatalogFiltersSidebar filters={filters} setFilters={setQueryStates} />
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
