'use client'

import React from 'react'
import ProductShowPageHero from './ProductShowPageHero'
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
import { redirect } from 'next/navigation'
import CatalogProductLegacy from '@components/common/CatalogProductLegacy'
import {
  ProductGroup,
  Product,
  OfferShippingDetails,
  MerchantReturnPolicy,
} from 'schema-dts'
import { JsonLd } from '@lib/json-ld'
import { addDays } from 'date-fns'
import staticData from '@generated/static.json'

export const getBrandFromProductSlug = (productSlug: string) => {
  const brandSlugs = staticData.brands.map(brand => brand.custom_url?.url)
  const brandSlug = brandSlugs.find(slug => productSlug.startsWith(slug))

  return brandSlug
}

interface Props {
  path: string
  brandSlug: string
}

const ProductShowPage = ({ path, brandSlug }: Props) => {
  const { data } = useSuspenseQuery<
    ProductPageGetDataQuery,
    ProductPageGetDataQueryVariables
  >(GET_DATA, { variables: { path } })

  const product = data.site.route.node

  if (product?.__typename !== 'Product') {
    // If the product is not found, redirect to brand page
    redirect(
      routes.internal.catalog.brand.show.href({
        brandSlug,
      }),
    )
  }

  const relatedProducts =
    product.relatedProducts.edges?.map(edge => edge?.node).filter(notEmpty) ||
    []

  const baseUrl = makeAbsoluteUrl(
    routes.internal.catalog.product.href({
      productSlug: product.path,
    }),
  )

  const gender =
    product.gender.edges?.[0]?.node.value.toLowerCase().trim() === 'womens'
      ? 'female'
      : 'unisex'

  const shippingDetailsJsonLd: OfferShippingDetails = {
    '@id': `${product.sku}#shipping`,
    '@type': 'OfferShippingDetails',
    shippingDestination: {
      '@type': 'DefinedRegion',
      addressCountry: 'US',
      addressRegion: 'MI',
    },
    shippingRate: {
      '@type': 'MonetaryAmount',
      value: 0,
      currency: 'USD',
    },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: {
        '@type': 'QuantitativeValue',
        minValue: 1,
        maxValue: 10,
        unitCode: 'DAY',
      },
      transitTime: {
        '@type': 'QuantitativeValue',
        minValue: 1,
        maxValue: 5,
        unitCode: 'DAY',
      },
    },
  }

  const merchantReturnPolicy: MerchantReturnPolicy = {
    '@id': `${product.sku}#return`,
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'US',
    returnPolicyCategory: 'MerchantReturnNotPermitted',
  }

  const productsJsonLd: Product[] =
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

        const variantUrl = routes.internal.catalog.product.href({
          productSlug: product.path,
          params: {
            color: color?.toLowerCase(),
            size: size?.toLowerCase(),
          },
        })

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
          '@id': variant.sku,
          '@type': 'Product',
          url: variantUrl,
          image: images,
          size: size,
          color: color,
          name,
          description: product.plainTextDescription,
          sku: variant.sku,
          mpn: variant.mpn || undefined,
          gtin: variant.gtin || undefined,
          itemCondition: 'NewCondition',
          offers: [
            {
              '@type': 'Offer',
              price: currency(variant.prices?.price.value, {}).toString(),
              priceCurrency: variant.prices?.price.currencyCode,
              priceValidUntil: addDays(new Date(), 7).toISOString(),
              itemCondition: 'NewCondition',
              availability: variant.isPurchasable ? 'InStock' : 'OutOfStock',
              shippingDetails: {
                '@id': `${product.sku}#shipping`,
              },
              hasMerchantReturnPolicy: {
                '@id': `${product.sku}#return`,
              },
            },
          ],
        }
      }) || []

  const productGroupJsonLd: ProductGroup = {
    '@id': product.sku,
    '@type': 'ProductGroup',
    url: baseUrl,
    name: product.humanizedName,
    description: product.plainTextDescription,
    brand: product.brand?.name,
    sku: product.sku,
    productGroupID: product.sku,
    image: product.defaultImage?.url,
    review: [],
    variesBy: ['Size', 'Color'],
    audience: {
      '@type': 'PeopleAudience',
      suggestedGender: gender,
      suggestedMinAge: 13,
    },
    hasVariant: productsJsonLd,
  }

  return (
    <>
      <JsonLd
        scriptId="product"
        json={{ '@context': 'https://schema.org', ...productGroupJsonLd }}
      />
      <JsonLd
        scriptId="shipping_details"
        json={{ '@context': 'https://schema.org', ...shippingDetailsJsonLd }}
      />
      <JsonLd
        scriptId="return_policy"
        json={{ '@context': 'https://schema.org', ...merchantReturnPolicy }}
      />

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
