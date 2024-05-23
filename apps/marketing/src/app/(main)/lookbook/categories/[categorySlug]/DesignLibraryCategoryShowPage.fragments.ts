import { gql } from '@apollo/client'
import CmsResponsiveImage from '@components/common/_dato-cms/CmsResponsiveImage'
import { FeaturedProductsGridFragments } from '@components/common/FeaturedProductsGrid'

export const fragments = {
  site: gql`
    ${FeaturedProductsGridFragments.catalog}
    fragment DesignLibraryCategoryShowPageCatalogFragment on Site {
      ...FeaturedProductsGridCatalogFragment
    }
  `,
  category: gql`
    ${CmsResponsiveImage.fragments.image}
    fragment DesignLibraryCategoryShowPageDesignCategoryFragment on DesignCategoryRecord {
      id
      name
      slug
      _seoMetaTags {
        attributes
        content
        tag
      }
      _allReferencingDesigns {
        id
        primaryImage {
          id
          responsiveImage {
            ...CmsResponsiveImageFragment
          }
        }
      }
    }
  `,
}
