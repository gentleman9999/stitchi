import { gql } from '@apollo/client'
import { fragments as UseProductOptionsFragments } from '@components/hooks/useProductOptions/useProductOptions.fragments'

const fragments = {
  product: gql`
    ${UseProductOptionsFragments.product}
    fragment CatalogProductLegacyProductFragment on Product {
      ...UseProductColorsProductFragment
      id
      humanizedName
      path
      sku
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
        altText
        url(width: 800)
      }
    }
  `,
}

export default fragments
