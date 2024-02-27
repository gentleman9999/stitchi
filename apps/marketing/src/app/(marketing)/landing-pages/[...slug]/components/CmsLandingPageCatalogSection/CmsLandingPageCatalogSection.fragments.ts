import { gql } from '@apollo/client'

export const fragments = {
  catalogSection: gql`
    fragment CmsLandingPageCatalogSectionCatalogSectionFragment on PageSectionCatalogRecord {
      id
      title
      description
      disableDefaultCategories
      categories {
        id
        bigCommerceCategoryId
        name
      }
    }
  `,
}
