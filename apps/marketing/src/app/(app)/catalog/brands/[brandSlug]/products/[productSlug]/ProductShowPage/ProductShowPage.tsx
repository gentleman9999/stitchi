'use client'

import Container from '@components/ui/Container'
import React from 'react'
import ProductShowPageHero from './ProductShowPageHero'
import { ProductJsonLd, ProductJsonLdProps } from 'next-seo'
import { makeProductTitle } from '@lib/utils/catalog'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import routes from '@lib/routes'
import { notEmpty } from '@lib/utils/typescript'
import ProductQuickActions from './ProductQuickActions'
import ShareDialog from '@components/common/ShareDialog'
import ValuePropositions from './ValuePropositions'
import Breadcrumbs from '@components/common/Breadcrumbs'
import currency from 'currency.js'
import ProductShowPageRelatedProducts from './ProductShowPageRelatedProducts'
import ProductShowPageDetails from './ProductShowPageDetails'
import {
  ProductPageGetDataQuery,
  ProductPageGetDataQueryVariables,
} from '@generated/types'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { GET_DATA } from '../graphql'
import { notFound } from 'next/navigation'

interface Props {
  path: string
}

const ProductShowPage = ({ path }: Props) => {
  const { data } = useSuspenseQuery<
    ProductPageGetDataQuery,
    ProductPageGetDataQueryVariables
  >(GET_DATA, {
    variables: {
      path,
    },
  })

  const product = data?.site.route.node

  if (product?.__typename !== 'Product') {
    console.error('Expected Product, got', product?.__typename, {
      context: {
        node: product,
        data,
        path,
      },
    })

    notFound()
  }

  const [share, setShare] = React.useState(false)

  const relatedProducts =
    product.relatedProducts.edges?.map(edge => edge?.node).filter(notEmpty) ||
    []

  const url = makeAbsoluteUrl(
    routes.internal.catalog.product.href({
      brandSlug: product.brand?.path || '',
      productSlug: product.path,
    }),
  )

  const jsonLDData: ProductJsonLdProps & { id: string } = {
    url,
    id: product.id,
    description: product.plainTextDescription,
    productName: product.name,
    brand: product.brand?.name,
    images:
      product.images.edges
        ?.map(edge => edge?.node.seoImageUrl)
        .filter(notEmpty) || [],
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
          price: currency(product.priceMetadata.minPriceCents || 0, {
            fromCents: true,
          }),
          priceCurrency: 'USD',
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
      <ProductJsonLd useAppDir {...jsonLDData} key={jsonLDData.id} />
      {share ? <ShareDialog open onClose={() => setShare(false)} /> : null}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-col-reverse gap-4">
          <div className="flex justify-between items-center">
            {/* {product.brand ? (
              <Breadcrumbs
                breadcrumbs={makeBreadcrumbs({
                  brandLabel: product.brand.name,
                  brandSlug: product.brand.path.replaceAll('/', ''),
                  productLabel: makeProductTitle(product),
                  productSlug: product.path.replaceAll('/', ''),
                })}
              />
            ) : null} */}
            <div></div>

            <ProductQuickActions
              entityId={product.entityId}
              productName={product.name}
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
    </>
  )
}

const Divider = () => <hr className="my-1" />

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

export default ProductShowPage
