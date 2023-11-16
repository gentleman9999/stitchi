import { gql } from '@apollo/client'
import { fragments as ProductShowPageFragments } from './ProductShowPage/ProductShowPage.fragments'

export const GET_DATA = gql`
  ${ProductShowPageFragments.product}
  query ProductPageGetDataQuery($path: String!, $variantsFirst: Int = 250) {
    site {
      route(path: $path) {
        node {
          id
          ... on Product {
            ...ProductShowPageHeroFragment
          }
        }
      }
    }
  }
`
