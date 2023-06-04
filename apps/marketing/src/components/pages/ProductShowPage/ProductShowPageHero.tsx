import { gql } from '@apollo/client'
import { ProductShowPageHeroProductFragment } from '@generated/ProductShowPageHeroProductFragment'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'
import { ArrowRight } from 'icons'
import { track } from '@lib/analytics'
import CatalogProductVariantPreview from '@components/common/CatalogProductVariantPreview'
import { Button } from '@components/ui'
import currency from 'currency.js'

interface Props {
  product: ProductShowPageHeroProductFragment
}

const ProductShowPageHero = ({ product }: Props) => {
  return (
    <div className="grid grid-cols-12 gap-2 sm:gap-4 md:gap-10">
      <div className="col-span-12 sm:col-span-6 lg:col-span-7 flex flex-col gap-4">
        <CatalogProductVariantPreview product={product} />
      </div>

      <div className="col-span-12 sm:col-span-6 lg:col-span-5">
        <div className="sticky top-24 flex flex-col gap-6">
          <div className="p-6 border rounded-sm @container">
            <div className="flex flex-col @xs:flex-row justify-between @xs:items-center gap-4">
              <div className="flex flex-col">
                <span className="text-gray-400 font-medium font-headingDisplay">
                  from
                </span>{' '}
                <span className="text-5xl font-medium font-headingDisplay text-gray-600">
                  {currency(product.priceCents, { fromCents: true }).format()}{' '}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2 w-full @xs:w-auto">
                <Button
                  className="whitespace-nowrap"
                  color="brandPrimary"
                  Component={Link}
                  href={routes.internal.catalog.product.purchase.href({
                    productSlug: product.path,
                    brandSlug: product.brand?.path || '',
                  })}
                  onClick={() => {
                    track.productPrimaryCtaClicked({ name: product.name })
                  }}
                >
                  Start an order
                </Button>
                <Button
                  className="whitespace-nowrap"
                  variant="ghost"
                  Component={Link}
                  href={routes.internal.catalog.product.purchase.href({
                    productSlug: product.path,
                    brandSlug: product.brand?.path || '',
                  })}
                  onClick={() => {
                    track.productSecondaryCtaClicked({ name: product.name })
                  }}
                >
                  Instant quote
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-sm">
              Elevate your brand by collaborating with one of our skilled
              designers at no additional cost!
            </span>
            <Link
              href={routes.internal.getStarted.href()}
              className="flex items-center underline font-medium"
              onClick={() =>
                track.productCustomDesignClicked({ name: product.name })
              }
            >
              Work with a designer{' '}
              <ArrowRight width={16} className="stroke-2 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

ProductShowPageHero.fragments = {
  product: gql`
    ${CatalogProductVariantPreview.fragments.product}
    fragment ProductShowPageHeroProductFragment on Product {
      ...CatalogProductVariantPreviewProductFragment
      id
      entityId
      name
      path
      priceCents

      defaultImage {
        urlOriginal
        altText
        url(width: 300)
      }
      brand {
        id
        path
      }

      variants(first: $variantsFirst) {
        edges {
          node {
            id
            entityId
          }
        }
      }
    }
  `,
}

export default ProductShowPageHero
