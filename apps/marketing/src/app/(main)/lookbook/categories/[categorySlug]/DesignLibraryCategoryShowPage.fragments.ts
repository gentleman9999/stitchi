import { gql } from '@apollo/client'
import { CmsResponsiveImageFragments } from '@components/common/.dato-cms/CmsResponsiveImage'
import { FeaturedProductsGridFragments } from '@components/common/FeaturedProductsGrid'

export const fragments = {
  site: gql`
    ${FeaturedProductsGridFragments.catalog}
    fragment DesignLibraryCategoryShowPageCatalogFragment on Site {
      ...FeaturedProductsGridCatalogFragment
    }
  `,
  category: gql`
    ${CmsResponsiveImageFragments.image}
    fragment DesignLibraryCategoryShowPageDesignCategoryFragment on DesignCategoryRecord {
      id
      name
      slug
      _seoMetaTags {
        ...CmsSeoTagsFragment
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
