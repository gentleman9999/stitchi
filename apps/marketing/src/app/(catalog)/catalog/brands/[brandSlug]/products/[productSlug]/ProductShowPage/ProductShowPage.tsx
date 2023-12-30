'use client'

import React from 'react'
import ProductShowPageHero from './ProductShowPageHero'
import { ProductJsonLd, ProductJsonLdProps } from 'next-seo'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import routes from '@lib/routes'
import { notEmpty } from '@lib/utils/typescript'
import ProductQuickActions from './ProductQuickActions'
import currency from 'currency.js'
import ProductShowPageDetails from './ProductShowPageDetails'
import {
  ProductPageGetDataQuery,
  ProductPageGetDataQueryVariables,
} from '@generated/types'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { GET_DATA } from '../graphql'
import { notFound } from 'next/navigation'
import CatalogProductLegacy from '@components/common/CatalogProductLegacy'

interface Props {
  path: string
}

const ProductShowPage = ({ path }: Props) => {
  const { data } = useSuspenseQuery<
    ProductPageGetDataQuery,
    ProductPageGetDataQueryVariables
  >(GET_DATA, { variables: { path } })

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
    useAppDir: true, // Required when using Next.js app directory
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
        const variantOptions = variant.options.edges
          ?.map(edge => edge?.node)
          .filter(notEmpty)

        const color = variantOptions
          ?.find(option => option?.displayName === 'Color')
          ?.values.edges?.map(edge => edge?.node)
          .filter(notEmpty)?.[0]?.label

        const size = variantOptions
          ?.find(option => option?.displayName === 'Size')
          ?.values.edges?.map(edge => edge?.node)
          .filter(notEmpty)?.[0]?.label

        return {
          url,
          color,
          size: {
            name: size,
            sizeGroup: 'https://schema.org/WearableSizeGroupRegular',
            sizeSystem: 'https://schema.org/WearableSizeSystemUS',
          },
          price: currency(product.priceMetadata.minPriceCents || 0, {
            fromCents: true,
          }),
          priceCurrency: 'USD',
          images: variant.defaultImage ? [variant.defaultImage.url] : [],
          sku: variant.sku,
          mpn: variant.mpn || undefined,
          gtin: variant.gtin || undefined,
          hasMerchantReturnPolicy: true,
          itemCondition: 'https://schema.org/NewCondition',
          availability: 'https://schema.org/InStock',
          seller: {
            name: 'Stitchi',
          },
        }
      }),
    aggregateRating:
      product.reviewSummary.numberOfReviews === 0
        ? undefined
        : {
            ratingValue: product.reviewSummary.summationOfRatings ?? 0,
            reviewCount: product.reviewSummary.numberOfReviews ?? 0,
            bestRating: 5,
            worstRating: 1,
          },
    reviews:
      product.reviews.edges
        ?.map(edge => edge?.node)
        .filter(notEmpty)
        .map(review => ({
          datePublished: review.createdAt.utc,
          reviewBody: review.text,
          reviewAspect: review.title,
          reviewRating: {
            ratingValue: review.rating,
            bestRating: 5,
            worstRating: 1,
          },
          author: {
            name: review.author.name,
          },
        })) || [],
  }

  return (
    <>
      <ProductJsonLd {...jsonLDData} key={jsonLDData.id} />

      <div>
        <div className="flex justify-end items-center">
          <ProductQuickActions
            shareHref={routes.internal.catalog.product.share.href({
              brandSlug: product.brand?.path || '',
              productSlug: product.path,
            })}
            product={{
              entityId: product.entityId,
              productName: product.name,
            }}
          />
        </div>

        <ProductShowPageHero product={product} />
      </div>

      <Divider />

      <div>
        <h2 className="font-semibold text-xl md:text-2xl">You may also like</h2>
        <div className="flex flex-row gap-4 overflow-x-scroll mt-2">
          {relatedProducts.map(product => (
            <div key={product.id} className="flex-1 min-w-[200px] flex">
              <CatalogProductLegacy
                productId={product.id}
                priority={false}
                href={routes.internal.catalog.product.href({
                  brandSlug: product.brand?.path?.replaceAll('/', '') || '',
                  productSlug: product.path?.replaceAll('/', '') || '',
                })}
              />
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <ProductShowPageDetails productId={product.id} />

      <Divider />
    </>
  )
}

const Divider = () => <hr className="" />

export default ProductShowPage
