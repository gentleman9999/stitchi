import { gql } from '@apollo/client'

export const GET_DATA = gql`
  query CatalogCategoryPageGetDataQuery($path: String!) {
    site {
      route(path: $path) {
        node {
          id

          ... on Category {
            entityId
            name
            description
            path
            seo {
              metaDescription
            }
          }
        }
      }
    }
  }
`
