import { gql } from '@apollo/client'
import { fragments as UseProductOptionsFragments } from '@components/hooks/useProductOptions/useProductOptions.fragments'
import { fragments as CatalogProductVariantPreviewFragments } from '@components/common/CatalogProductVariantPreview/CatalogProductVariantPreview.fragments'
import { fragments as ProductFormFragments } from './ProductForm/ProductForm.fragments'

export const fragments = {
  product: gql`
    ${CatalogProductVariantPreviewFragments.product}
    ${UseProductOptionsFragments.product}
    ${ProductFormFragments.product}
    fragment ProductShowPageHeroProductFragment on Product {
      ...CatalogProductVariantPreviewProductFragment
      ...ProductFormProductFragment
      ...UseProductColorsProductFragment

      variants(first: $variantsFirst) {
        edges {
          node {
            id
            entityId
            options {
              edges {
                node {
                  displayName
                  values {
                    edges {
                      node {
                        entityId
                        label
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      id
      entityId
      name
      path
    }
  `,
}
