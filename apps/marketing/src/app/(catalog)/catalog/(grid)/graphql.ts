import { gql } from '@apollo/client'
import { CatalogProductLegacyFragments } from '@components/common/CatalogProductLegacy'

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
