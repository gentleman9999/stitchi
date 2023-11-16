import { gql } from '@apollo/client'

export const fragments = {
  product: gql`
    fragment CatalogProductVariantPreviewProductFragment on Product {
      id
      name
      defaultImage {
        url(width: 700)
      }

      images(first: 10) {
        edges {
          node {
            isDefault
            url(width: 700)
          }
        }
      }

      variants(first: $variantsFirst) {
        edges {
          node {
            id
            entityId
            defaultImage {
              isDefault
              url(width: 700)
            }
          }
        }
      }
    }
  `,
}
