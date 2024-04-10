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

  const product = data.site.route.node

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

  const productsJsonLd: ProductJsonLdProps[] =
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

        const gender =
          product.gender.edges?.[0]?.node.value.toLowerCase().trim() ===
          'womens'
            ? 'female'
            : 'unisex'

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
          images,
          size: size,
          inProductGroupWithID: product.sku,
          productName: name,
          description: product.plainTextDescription,
          brand: product.brand?.name,
          sku: variant.sku,
          mpn: variant.mpn || undefined,
          gtin: variant.gtin || undefined,
          itemCondition: 'https://schema.org/NewCondition',
          color: color,
          // validFrom: new Date().toISOString(),
          audience: {
            type: 'https://schema.org/PeopleAudience',
            suggestedGender: gender,
            suggestedMinAge: 13,
          },

          offers: [
            {
              url,
              price: currency(variant.prices?.price.value, {}),
              priceCurrency: variant.prices?.price.currencyCode,
              hasMerchantReturnPolicy: {
                applicableCountry: 'US',
                returnPolicyCategory:
                  'https://schema.org/MerchantReturnNotPermitted',
              },
              itemCondition: 'https://schema.org/NewCondition',
              availability: variant.isPurchasable
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
              shippingDetails: {
                shippingDestination: {
                  addressCountry: 'US',
                  addressRegion: 'MI',
                },
                shippingRate: {
                  value: 0,
                  currency: 'USD',
                },
                deliveryTime: {
                  handlingTime: {
                    minValue: 1,
                    maxValue: 10,
                    unitCode: 'DAY',
                  },
                  transitTime: {
                    minValue: 1,
                    maxValue: 5,
                    unitCode: 'DAY',
                  },
                },
              },
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
        <ul className="flex flex-row gap-4 overflow-x-scroll mt-2">
          {relatedProducts.map(product => (
            <CatalogProductLegacy
              key={product.id}
              className="flex-1 min-w-[200px]"
              productId={product.id}
              href={routes.internal.catalog.product.href({
                productSlug: product.path?.replaceAll('/', '') || '',
              })}
              imageSizes="(max-width: 400px): 190px, (max-width: 525px) 230px, 284px"
            />
          ))}
        </ul>
      </div>

      <Divider />

      <ProductShowPageDetails productId={product.id} />

      <Divider />
    </>
  )
}

const Divider = () => <hr className="" />

export default ProductShowPage
