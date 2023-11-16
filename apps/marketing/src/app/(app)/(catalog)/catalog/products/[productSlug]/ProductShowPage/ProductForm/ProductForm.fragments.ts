import { gql } from '@apollo/client'

export const fragments = {
  product: gql`
    fragment ProductFormProductFragment on Product {
      id
      entityId
      name
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
