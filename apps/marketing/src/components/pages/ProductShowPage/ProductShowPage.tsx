import { gql } from '@apollo/client'
import { Container } from '@components/ui'
import { ProductShowPageHeroFragment } from '@generated/ProductShowPageHeroFragment'
import React from 'react'
import ProductShowPageHero from './ProductShowPageHero/ProductShowPageHero'
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
import ProductQuickActions from './ProductQuickActions'
import ShareDialog from '@components/common/ShareDialog'
import ValuePropositions from './ValuePropositions'
import Breadcrumbs from '@components/common/Breadcrumbs'
import currency from 'currency.js'
import ProductShowPageRelatedProducts from './ProductShowPageRelatedProducts'
import ProductShowPageDetails from './ProductShowPageDetails'

interface Props {
  product: ProductShowPageHeroFragment
}

const ProductShowPage = ({ product }: Props) => {
  const [share, setShare] = React.useState(false)

  const relatedProducts =
    product.relatedProducts.edges?.map(edge => edge?.node).filter(notEmpty) ||
    []

  const title = makeProductTitle(product)

  // SEO Title shouldn't be the same as H1
  const seoTitle = `${title}${product.sku ? ` - ${product.sku}` : ''}`

  const url = makeAbsoluteUrl(
    routes.internal.catalog.product.href({
      brandSlug: product.brand?.path || '',
      productSlug: product.path,
    }),
  )

  const seoProps: NextSeoProps = {
    canonical: url,
    title: seoTitle,
    description: product.seo.metaDescription || product.plainTextDescription,
    openGraph: {
      title: seoTitle,
      url,
      images: makeImages(product),
    },
  }

  const jsonLDData: ProductJsonLdProps & { id: string } = {
    url,
    id: product.id,
    productName: product.name,
    description: product.plainTextDescription,
    brand: product.brand?.name,
    images: product.defaultImage ? [product.defaultImage.url] : [],
    offers: product.variants.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty)
      .map(variant => {
        const color = variant.options.edges
          ?.map(edge => edge?.node)
          .find(option => option?.displayName === 'Color')
          ?.values.edges?.map(edge => edge?.node)
          .filter(notEmpty)[0].label

        return {
          url,
          color,
          price: currency(product.priceCents || 0, {
            fromCents: true,
          }),
          priceCurrency: variant.prices?.price.currencyCode,
          images: variant.defaultImage ? [variant.defaultImage.url] : [],
          sku: variant.sku,
          mpn: variant.mpn || undefined,
          gtin13: variant.gtin || undefined,
          itemCondition: 'https://schema.org/NewCondition',
          availability: 'https://schema.org/InStock',
          seller: {
            name: 'Stitchi',
          },
        }
      }),
  }

  return (
    <>
      <NextSeo {...seoProps} />
      <ProductJsonLd {...jsonLDData} key={jsonLDData.id} />
      {share ? <ShareDialog open onClose={() => setShare(false)} /> : null}
      <Container>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-col-reverse gap-4">
            <h1 className="font-headingDisplay font-semibold text-2xl sm:text-3xl text-gray-800">
              {makeProductTitle(product)}
            </h1>

            <div className="flex justify-between items-center">
              {product.brand ? (
                <Breadcrumbs
                  breadcrumbs={makeBreadcrumbs({
                    brandLabel: product.brand.name,
                    brandSlug: product.brand.path.replaceAll('/', ''),
                    productLabel: makeProductTitle(product),
                    productSlug: product.path.replaceAll('/', ''),
                  })}
                />
              ) : null}

              <ProductQuickActions
                entityId={product.entityId}
                onShareClick={() => setShare(true)}
              />
            </div>
          </div>

          <ProductShowPageHero product={product} />
          <Divider />
          <ProductShowPageRelatedProducts products={relatedProducts} />
          <Divider />
          <ProductShowPageDetails product={product} />
          <Divider />
          <ValuePropositions />
          <Divider />
        </div>
      </Container>
    </>
  )
}

const Divider = () => <hr className="my-1" />

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

const makeBreadcrumbs = (params: {
  brandSlug: string
  productSlug: string
  brandLabel: string
  productLabel: string
}) => {
  return [
    { label: 'Home', href: routes.internal.home.href(), hidden: true },
    { label: 'Catalog', href: routes.internal.catalog.href() },
    {
      label: params.brandLabel,
      href: routes.internal.catalog.brand.show.href({
        brandSlug: params.brandSlug,
      }),
    },
    {
      label: params.productLabel,
      href: routes.internal.catalog.product.href({
        brandSlug: params.brandSlug,
        productSlug: params.productSlug,
      }),
    },
  ]
}

export const fragments = {
  product: gql`
    ${ProductShowPageHero.fragments.product}
    ${ProductShowPageDetails.fragments.product}
    ${ProductShowPageRelatedProducts.fragments.product}
    fragment ProductShowPageHeroFragment on Product {
      id
      name
      path
      plainTextDescription
      gtin
      sku
      priceCents
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
      relatedProducts(first: 5) {
        edges {
          node {
            id
            ...ProductShowPageRelatedProductsProductFragment
          }
        }
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
      ...ProductShowPageHeroProductFragment
      ...ProductShowPageDetailsProductFragment
    }
  `,
}

export default ProductShowPage
