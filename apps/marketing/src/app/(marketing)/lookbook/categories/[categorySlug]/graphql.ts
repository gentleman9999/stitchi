import { gql } from '@apollo/client'
import { fragments } from './DesignLibraryCategoryShowPage.fragments'

export const GET_DATA = gql`
  ${fragments.category}
  ${fragments.site}
  query ProductPageGetDesignCategoryData($designCategorySlug: SlugFilter!) {
    site {
      ...DesignLibraryCategoryShowPageCatalogFragment
    }
    designCategory(filter: { slug: $designCategorySlug }) {
      id
      ...DesignLibraryCategoryShowPageDesignCategoryFragment
    }
  }
`
