import { gql } from '@apollo/client'

export const fragments = {
  category: gql`
    fragment CatalogHeaderCategoryFragment on Category {
      id
      name
      description
    }
  `,
  brand: gql`
    fragment CatalogHeaderBrandFragment on Brand {
      id
      name
    }
  `,
}
