import { gql } from '@apollo/client'
import { CatalogProductLegacyFragments } from '../../../components/common/CatalogProductLegacy'

const fragments = {
  site: gql`
    ${CatalogProductLegacyFragments.product}
    fragment CatalogProductGridSiteFragment on Site {
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
  `,
}

export default fragments
