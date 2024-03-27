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
      productSlug: product.path,
    }),
  )

  const productsJsonLd: (ProductJsonLdProps & { id: string })[] =
    product.variants.edges
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

        const imageGroup = variant.metafields.edges?.find(
          metafield => metafield?.node.key === 'image_group',
        )

        const images = [
          ...(variant.defaultImage
            ? [variant.defaultImage.url]
            : [product.defaultImage?.url]),
          ...product.allImages
            .filter(image => {
              const imageGroupTest = image.urlStandard
                .split('/')
                .pop()
                ?.split('_')
                .shift()

              return imageGroupTest === imageGroup?.node.value
            })
            .map(image => image.urlZoom),
        ].filter(notEmpty)

        const name = `${product.humanizedName} - ${color} - ${size}`

        return {
          useAppDir: true, // Required when using Next.js app directory
          url,
          images,
          size: size,
          adult: false,
          ageGroup: 'adult', // Change if it's for kids
          productName: name,
          id: variant.id,
          itemGroupId: product.sku,
          description: product.plainTextDescription,
          brand: product.brand?.name,
          sku: variant.sku,
          mpn: variant.mpn || undefined,
          gtin: variant.gtin || undefined,
          itemCondition: 'https://schema.org/NewCondition',
          color: color,
          validFrom: new Date().toISOString(),

          seller: {
            name: 'Stitchi',
          },
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
          offers: [
            {
              price: currency(product.prices?.price.value, {}),
              priceCurrency: 'USD',
              applicableCountry: 'US',
              hasMerchantReturnPolicy: true,
              availability: 'https://schema.org/InStock',
            },
          ],
        }
      }) || []

  return (
    <>
      {productsJsonLd.map((product, i) => (
        <ProductJsonLd {...product} key={i} />
      ))}

      <div>
        <div className="flex justify-end items-center">
          <ProductQuickActions
            shareHref={routes.internal.catalog.product.share.href({
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
