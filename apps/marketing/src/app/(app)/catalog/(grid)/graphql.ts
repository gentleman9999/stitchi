import { gql } from '@apollo/client'
import { SearchProductsSortInput } from '@generated/types'
import fragments from './CatalogProductGrid.fragments'

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
  ${fragments.site}
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
