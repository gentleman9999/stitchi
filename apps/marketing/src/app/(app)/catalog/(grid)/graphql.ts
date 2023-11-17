import { gql } from '@apollo/client'
import { SearchProductsSortInput } from '@generated/types'
import { CatalogProductLegacyFragments } from '@components/common/CatalogProductLegacy'

export const makeDefaultQueryVariables = ({
  brandEntityId,
  categoryEntityId,
}: {
  brandEntityId?: number
  categoryEntityId?: number
} = {}) => ({
  first: 24,
  sort: SearchProductsSortInput.RELEVANCE,
  filters: {
    brandEntityIds: brandEntityId ? [brandEntityId] : undefined,
    categoryEntityIds: categoryEntityId ? [categoryEntityId] : undefined,
    searchSubCategories: true,
  },
})

export const GET_DATA = gql`
  ${CatalogProductLegacyFragments.product}
  query CatalogIndexPageGetDataQuery(
    $filters: SearchProductsFiltersInput!
    $sort: SearchProductsSortInput!
    $first: Int!
    $after: String
  ) {
    site {
      search {
        searchProducts(filters: $filters, sort: $sort) {
          products(first: $first, after: $after) {
            edges {
              node {
                id
                entityId
                ...CatalogProductLegacyProductFragment
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    }
  }
`
