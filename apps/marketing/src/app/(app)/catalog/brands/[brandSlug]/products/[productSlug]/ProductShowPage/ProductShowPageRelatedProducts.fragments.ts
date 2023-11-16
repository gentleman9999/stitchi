import { gql } from '@apollo/client'
import { CatalogProductLegacyFragments } from '@components/common/CatalogProductLegacy'

export const fragments = {
  product: gql`
    ${CatalogProductLegacyFragments.product}
    fragment ProductShowPageRelatedProductsProductFragment on Product {
      id
      ...CatalogProductLegacyProductFragment
    }
  `,
}
