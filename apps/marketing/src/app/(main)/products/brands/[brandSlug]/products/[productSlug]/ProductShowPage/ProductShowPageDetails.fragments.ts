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
      customFields(first: 50) {
        edges {
          node {
            entityId
            name
            value
          }
        }
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
