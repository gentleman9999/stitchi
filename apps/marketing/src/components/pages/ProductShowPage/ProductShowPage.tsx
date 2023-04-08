import { gql } from '@apollo/client'
import { Container } from '@components/ui'
import { ProductShowPageProductFragment } from '@generated/ProductShowPageProductFragment'
import React from 'react'
import ProductDialog from './ProductDialog/ProductDialog'
import {
  NextSeo,
  NextSeoProps,
  ProductJsonLd,
  ProductJsonLdProps,
} from 'next-seo'
import { makeProductTitle } from '@utils/catalog'
import { OpenGraphMedia } from 'next-seo/lib/types'
import makeAbsoluteUrl from '@utils/get-absolute-url'
import routes from '@lib/routes'
import { notEmpty } from '@utils/typescript'
import { ProductPageGetDataQuery_site_route_node_Product } from '@generated/ProductPageGetDataQuery'

interface Props {
  product: ProductShowPageProductFragment
}

const ProductShowPage = ({ product }: Props) => {
  const title = makeProductTitle(product)

  const url = makeAbsoluteUrl(
    routes.internal.catalog.product.href({
      brandSlug: product.brand?.path || '',
      productSlug: product.path,
    }),
  )

  const seoProps: NextSeoProps = {
    canonical: url,
    title,
    description: product.seo.metaDescription || product.plainTextDescription,
    openGraph: {
      title,
      url,
      images: makeImages(product),
    },
  }

  const jsonLDData: (ProductJsonLdProps & { id: string })[] =
    product.variants.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty)
      .map(variant => {
        console.log()

        const color = variant.options.edges
          ?.map(edge => edge?.node)
          .find(option => option?.displayName === 'Color')
          ?.values.edges?.map(edge => edge?.node)
          .filter(notEmpty)[0].label

        return {
          color,
          id: variant.id,
          productName: product.name,
          description: product.plainTextDescription,
          brand: product.brand?.name,
          images: variant.defaultImage ? [variant.defaultImage.url] : [],
          sku: variant.sku,
          mpn: variant.mpn || undefined,
          offers: variant.prices
            ? {
                url,
                price: variant.prices.price.value,
                priceCurrency: variant.prices.price.currencyCode,
                itemCondition: 'https://schema.org/NewCondition',
                availability: 'https://schema.org/InStock',
                seller: {
                  name: 'Stitchi',
                },
              }
            : undefined,
        }
      }) || []

  return (
    <>
      <NextSeo {...seoProps} />
      {jsonLDData.map(props => (
        <ProductJsonLd {...props} key={props.id} />
      ))}
      <Container>
        <ProductDialog product={product} />
      </Container>
    </>
  )
}

const makeImages = (
  product: ProductPageGetDataQuery_site_route_node_Product,
): OpenGraphMedia[] => {
  const { defaultImage: image } = product
  if (!image) {
    return []
  }

  return [
    {
      url: image.seoImageUrl,
      width: 1000,
      alt: makeProductTitle(product),
    },
  ]
}

ProductShowPage.fragments = {
  product: gql`
    ${ProductDialog.fragments.product}
    fragment ProductShowPageProductFragment on Product {
      id
      name
      path
      plainTextDescription
      defaultImage {
        seoImageUrl: url(width: 1000)
      }
      brand {
        id
        name
        path
      }
      seo {
        metaDescription
      }
      variants(first: 250) {
        edges {
          node {
            id
            gtin
            mpn
            sku
            prices {
              price {
                currencyCode
                value
              }
            }
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
      ...ProductDialogProductFragment
    }
  `,
}

export default ProductShowPage
