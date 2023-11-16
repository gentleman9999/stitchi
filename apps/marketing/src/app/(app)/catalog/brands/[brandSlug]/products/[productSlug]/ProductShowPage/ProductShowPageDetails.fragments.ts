import { gql } from '@apollo/client'

export const fragments = {
  product: gql`
    fragment ProductShowPageDetailsProductFragment on Product {
      id
      description
      brand {
        id
        name
        path
      }
      categories(first: 10) {
        edges {
          node {
            id
            name
            path
          }
        }
      }
    }
  `,
}
