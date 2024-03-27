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
  defaultBrandEntityId: number | null
  isRootCategory: boolean
}

const CatalogFiltersContainer = ({
  variables,
  setQueryStates,
  defaultBrandEntityId,
  isRootCategory,
}: Props) => {
  const {
    data: {
      site: { search, categoryTree },
    },
  } = useSuspenseQuery<
    CatalogFiltersContainerGetDataQuery,
    CatalogFiltersContainerGetDataQueryVariables
  >(GET_DATA, { variables })

  return (
    <aside className="hidden lg:block w-64">
      <CatalogFiltersSidebar
        filters={search.searchProducts.filters}
        defaultBrandEntityId={defaultBrandEntityId}
        setFilters={setQueryStates}
        categoryTree={categoryTree}
        isRootCategory={isRootCategory}
      />
    </aside>
  )
}

const GET_DATA = gql`
  ${CatalogFiltersSidebar.fragments.filters}
  ${CatalogFiltersSidebar.fragments.categoryTreeItem}

  query CatalogFiltersContainerGetDataQuery(
    $filters: SearchProductsFiltersInput!
    $sort: SearchProductsSortInput!
    $rootCategoryEntityId: Int
  ) {
    site {
      categoryTree(rootEntityId: $rootCategoryEntityId) {
        entityId
        ...CatalogFiltersSidebarCategoryTreeItemFragment
      }
      search {
        searchProducts(filters: $filters, sort: $sort) {
          products {
            collectionInfo {
              totalItems
            }
          }
          filters(first: 50) {
            ...CatalogFiltersSidebarFiltersFragment
          }
        }
      }
    }
  }
`

export default CatalogFiltersContainer
