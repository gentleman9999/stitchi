import { gql } from '@apollo/client'

export const fragments = {
  product: gql`
    fragment UseProductColorsProductFragment on Product {
      id
      productOptions {
        edges {
          node {
            entityId
            ... on MultipleChoiceOption {
              displayName
              values {
                edges {
                  node {
                    entityId
                    label
                    ... on SwatchOptionValue {
                      hexColors
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
}
