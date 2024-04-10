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
            humanizedName
            path
            sku
            plainTextDescription
            defaultImage {
              seoImageUrl: url(width: 1000)
            }

            gender: customFields(names: "Gender") {
              edges {
                node {
                  name
                  value
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

                  prices {
                    price {
                      value
                      currencyCode
                    }
                  }

                  isPurchasable

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
