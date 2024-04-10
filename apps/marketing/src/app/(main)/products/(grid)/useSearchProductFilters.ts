import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import {
  SearchProductsFiltersInput,
  UseSearchProductFiltersGetDataQuery,
  UseSearchProductFiltersGetDataQueryVariables,
} from '@generated/types'
import { notEmpty } from '@lib/utils/typescript'

export type Filter = NonNullable<
  NonNullable<
    UseSearchProductFiltersGetDataQuery['site']['search']['searchProducts']['filters']['edges']
  >[number]
>['node']

export type CategoryTree = NonNullable<
  UseSearchProductFiltersGetDataQuery['site']['categoryTree']
>

interface Props {
  rootCategoryEntityId: number
  filters: SearchProductsFiltersInput
}

const useSearchProductFilters = ({
  rootCategoryEntityId,
  filters: filtersInput,
}: Props) => {
  const { data } = useSuspenseQuery<
    UseSearchProductFiltersGetDataQuery,
    UseSearchProductFiltersGetDataQueryVariables
  >(GET_DATA, { variables: { rootCategoryEntityId, filters: filtersInput } })

  const { categoryTree, search } = data.site
  const { filters: filterEdges, products } = search.searchProducts

  const filters =
    filterEdges?.edges?.map(edge => edge?.node).filter(notEmpty) || []

  return {
    filters,
    categoryTree,
    totalItems: products.collectionInfo?.totalItems,
  }
}

const GET_DATA = gql`
  query UseSearchProductFiltersGetDataQuery(
    $filters: SearchProductsFiltersInput!
    $rootCategoryEntityId: Int!
  ) {
    site {
      categoryTree(rootEntityId: $rootCategoryEntityId) {
        entityId
        name
        productCount
        children {
          name
          entityId
          path
          productCount
        }
      }
      search {
        searchProducts(filters: $filters) {
          products {
            collectionInfo {
              totalItems
            }
          }
          filters(first: 50) {
            edges {
              node {
                name
                isCollapsedByDefault

                ... on BrandSearchFilter {
                  displayProductCount
                  brands {
                    edges {
                      node {
                        entityId
                        name
                        isSelected
                        productCount
                      }
                    }
                  }
                }

                ... on PriceSearchFilter {
                  selected {
                    minPrice
                    maxPrice
                  }
                }

                ... on ProductAttributeSearchFilter {
                  filterName
                  attributes {
                    edges {
                      node {
                        value
                        isSelected
                        productCount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default useSearchProductFilters
