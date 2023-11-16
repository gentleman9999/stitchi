import { gql } from '@apollo/client'

export const GET_DATA = gql`
  query BrandPageGetDataQuery($path: String!) {
    site {
      route(path: $path) {
        node {
          id
          ... on Brand {
            entityId
            name
            path
            defaultImage {
              url(width: 1200)
            }
            seo {
              pageTitle
              metaDescription
            }
          }
        }
      }
    }
  }
`
