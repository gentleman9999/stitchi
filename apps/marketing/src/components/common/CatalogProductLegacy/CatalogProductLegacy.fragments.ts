import { gql } from '@apollo/client'
import { fragments as UseProductOptionsFragments } from '@components/hooks/useProductOptions/useProductOptions.fragments'

const fragments = {
  product: gql`
    ${UseProductOptionsFragments.product}
    fragment CatalogProductLegacyProductFragment on Product {
      ...UseProductColorsProductFragment
      id
      name
      path
      prices {
        price {
          value
        }
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
