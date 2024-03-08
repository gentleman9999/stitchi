import { gql } from '@apollo/client'
import { CatalogProductLegacyFragments } from '@components/common/CatalogProductLegacy'
import { fragments as ProductShowPageHeroFragments } from './ProductShowPage/ProductShowPageHero/ProductShowPageHero.fragments'
import { fragments as ProductShowPageDetailsFragments } from './ProductShowPage/ProductShowPageDetails.fragments'

export const GET_DATA = gql`
  ${ProductShowPageHeroFragments.product}
  ${ProductShowPageDetailsFragments.product}
  ${CatalogProductLegacyFragments.product}
  query ProductPageGetDataQuery($path: String!, $variantsFirst: Int = 250) {
    site {
      route(path: $path) {
        node {
          id
          ... on Product {
            ...ProductShowPageHeroProductFragment
            ...ProductShowPageDetailsProductFragment
            name
            path
            sku
            prices {
              price {
                value
              }
            }
            plainTextDescription
            defaultImage {
              seoImageUrl: url(width: 1000)
            }
            reviewSummary {
              numberOfReviews
              summationOfRatings
            }
            reviews(first: 50, filters: { rating: { minRating: 4 } }) {
              edges {
                node {
                  author {
                    name
                  }
                  rating
                  title
                  text
                  createdAt {
                    utc
                  }
                }
              }
            }

            allImages {
              urlStandard
            }
            brand {
              id
              name
              path
            }
            seo {
              metaDescription
            }
            relatedProducts(first: 5) {
              edges {
                node {
                  id
                  ...CatalogProductLegacyProductFragment
                }
              }
            }
            variants(first: $variantsFirst, isPurchasable: true) {
              edges {
                node {
                  id
                  gtin
                  mpn
                  sku

                  options {
                    edges {
                      node {
                        displayName
                        values {
                          edges {
                            node {
                              label
                            }
                          }
                        }
                      }
                    }
                  }
                  jsonLdImage: defaultImage {
                    url(width: 700)
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
