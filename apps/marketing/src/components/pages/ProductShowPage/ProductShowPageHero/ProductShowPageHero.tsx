import { gql } from '@apollo/client'
import { ProductShowPageHeroProductFragment } from '@generated/ProductShowPageHeroProductFragment'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'
import CalculatorForm from './CalculatorForm'
import { ArrowRight } from 'icons'
import { track } from '@lib/analytics'
import CatalogProductVariantPreview from '@components/common/CatalogProductVariantPreview'

interface Props {
  product: ProductShowPageHeroProductFragment
}

const ProductShowPageHero = ({ product }: Props) => {
  const [variant, setVariant] = React.useState(
    product.variants.edges?.[0]?.node || null,
  )

  return (
    <div className="grid grid-cols-12 gap-2 sm:gap-4 md:gap-10">
      <div className="col-span-12 sm:col-span-6 lg:col-span-7 flex flex-col gap-4">
        <CatalogProductVariantPreview
          product={product}
          onVariantChange={variant => setVariant(variant || null)}
        />
      </div>

      <div className="col-span-12 sm:col-span-6 lg:col-span-5">
        <div className="flex flex-col gap-6">
          {variant ? (
            <div className="p-6 border rounded-sm">
              <CalculatorForm
                productName={product.name}
                productVariantEntityId={variant.entityId}
                productSlug={routes.internal.catalog.product.purchase.href({
                  productSlug: product.path,
                  brandSlug: product.brand?.path || '',
                })}
              />
            </div>
          ) : null}
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
      defaultImage {
        urlOriginal
        altText
        url(width: 300)
      }
      brand {
        id
        path
      }

      variants(first: $variantLimit) {
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
