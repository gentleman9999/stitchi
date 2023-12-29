import { gql } from '@apollo/client'

export const fragments = {
  product: gql`
    fragment ProductFormProductFragment on Product {
      id
      entityId
      name
      sku
      priceMetadata {
        minPriceCents
        maxPriceCents
      }
      brand {
        id
        name
      }
    }
  `,
}
