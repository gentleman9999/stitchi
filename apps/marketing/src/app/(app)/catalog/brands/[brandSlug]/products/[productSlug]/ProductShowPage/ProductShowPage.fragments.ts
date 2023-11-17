import { gql } from '@apollo/client'
import { fragments as ProductShowPageHeroFragments } from './ProductShowPageHero.fragments'
import { fragments as ProductShowPageDetailsFragments } from './ProductShowPageDetails.fragments'
import { CatalogProductLegacyFragments } from '@components/common/CatalogProductLegacy'

export const fragments = {
  product: gql`
    ${ProductShowPageHeroFragments.product}
    ${ProductShowPageDetailsFragments.product}
    ${CatalogProductLegacyFragments.product}
    fragment ProductShowPageHeroFragment on Product {
      id
      name
      path
      gtin
      sku
      priceMetadata {
        minPriceCents
      }
      plainTextDescription
      defaultImage {
        seoImageUrl: url(width: 1000)
      }
      images(first: 10) {
        edges {
          node {
            seoImageUrl: url(width: 1000)
          }
        }
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
      variants(first: $variantsFirst) {
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
      ...ProductShowPageHeroProductFragment
      ...ProductShowPageDetailsProductFragment
    }
  `,
}
