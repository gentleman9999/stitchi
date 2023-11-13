import { gql } from '@apollo/client'
import { UseProductOptionsFragments } from '@components/hooks/useProductOptions'

const fragments = {
  product: gql`
    ${UseProductOptionsFragments.product}
    fragment CatalogProductLegacyProductFragment on Product {
      ...UseProductColorsProductFragment
      id
      name
      path
      priceMetadata {
        minPriceCents
      }
      brand {
        id
        name
        path
      }

      defaultImage {
        urlOriginal
        altText
        url(width: 400)
      }
    }
  `,
}

export default fragments
