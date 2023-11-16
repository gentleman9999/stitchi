import { gql } from '@apollo/client'

export const fragments = {
  catalog: gql`
    fragment FeaturedProductsGridCatalogFragment on Site {
      featuredProducts {
        edges {
          node {
            id
            name
            path
            brand {
              id
              path
            }
            defaultImage {
              url(width: 200, height: 200)
            }
          }
        }
      }
    }
  `,
}
