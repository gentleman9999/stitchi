import { gql } from '@apollo/client'

export const fragments = {
  product: gql`
    fragment CatalogProductVariantPreviewProductFragment on Product {
      id
      name
      defaultImage {
        url(width: 700)
      }

      allImages {
        urlStandard
        urlZoom
        urlThumbnail
      }

      variants(first: $variantsFirst, isPurchasable: true) {
        edges {
          node {
            id
            entityId
            defaultImage {
              isDefault
              url(width: 700)
            }

            metafields(namespace: "main") {
              edges {
                node {
                  id
                  key
                  value
                }
              }
            }
          }
        }
      }
    }
  `,
}
