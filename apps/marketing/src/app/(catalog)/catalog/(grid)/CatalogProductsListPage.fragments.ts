import { gql } from '@apollo/client'
import { fragments as catalogHeaderFragments } from './CatalogHeader.fragments'

export const fragments = {
  category: gql`
    ${catalogHeaderFragments.category}
    fragment CatalogProductsListCategoryFragment on Category {
      id
      entityId
      ...CatalogHeaderCategoryFragment
    }
  `,
  brand: gql`
    ${catalogHeaderFragments.brand}
    fragment CatalogProductsListBrandFragment on Brand {
      id
      entityId
      ...CatalogHeaderBrandFragment
    }
  `,
}
