import { gql } from '@apollo/client'
import { CmsImageFragments } from '@components/common/CmsImage'
import { CmsSeoFragments } from '@components/common/CmsSeo'
import { FeaturedProductsGridFragments } from '@components/common/FeaturedProductsGrid'

export const fragments = {
  site: gql`
    ${FeaturedProductsGridFragments.catalog}
    fragment DesignLibraryCategoryShowPageCatalogFragment on Site {
      ...FeaturedProductsGridCatalogFragment
    }
  `,
  category: gql`
    ${CmsImageFragments.image}
    ${CmsSeoFragments.seoTags}
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
            ...CmsImageFragment
          }
        }
      }
    }
  `,
}
