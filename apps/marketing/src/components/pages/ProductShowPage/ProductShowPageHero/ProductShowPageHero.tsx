import { gql } from '@apollo/client'
import { ProductShowPageHeroProductFragment } from '@generated/ProductShowPageHeroProductFragment'
import routes from '@lib/routes'
import { generateImageSizes } from '@utils/image'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductColorGrid from './ProductColorGrid'
import CalculatorForm from './CalculatorForm'
import { ArrowRight } from 'icons'
import { track } from '@lib/analytics'

interface ProductOptionValues {
  colorEntityId: number | null
}

interface Props {
  product: ProductShowPageHeroProductFragment
}

const ProductShowPageHero = ({ product }: Props) => {
  const [productOptionValues, setProductOptionValues] =
    React.useState<ProductOptionValues>({
      colorEntityId: null,
    })

  const handleColorSelect = (colorEntityId: number) => {
    setProductOptionValues({
      ...productOptionValues,
      colorEntityId,
    })
  }

  const productVariants = product.variants.edges?.map(edge => edge?.node)

  const activeVariant = React.useMemo(
    () =>
      productVariants?.find(variant => {
        const options = variant?.options.edges?.map(edge => edge?.node)
        return options?.find(option => {
          const values = option?.values.edges?.map(edge => edge?.node)

          return values?.find(value => {
            return value?.entityId === productOptionValues.colorEntityId
          })
        })
      }) || productVariants?.[0],
    [productOptionValues.colorEntityId, productVariants],
  )

  const image = activeVariant?.defaultImage || product.defaultImage

  return (
    <div className="grid grid-cols-12 gap-2 sm:gap-4 md:gap-10">
      <div className="col-span-12 sm:col-span-6 lg:col-span-7 flex flex-col gap-4">
        {image ? (
          <div className="relative w-full h-[350px] sm:h-[400px] border-b">
            <Image
              fill
              priority
              style={{
                objectFit: 'contain',
              }}
              key={image.url}
              src={image.url}
              alt={image.altText || product.name}
              sizes={generateImageSizes([{ imageWidth: '624px' }])}
            />
          </div>
        ) : null}
        <ProductColorGrid
          product={product}
          onColorSelect={handleColorSelect}
          colorEntityId={productOptionValues.colorEntityId}
        />
      </div>

      <div className="col-span-12 sm:col-span-6 lg:col-span-5">
        <div className="flex flex-col gap-6">
          {activeVariant ? (
            <div className="p-6 border rounded-sm">
              <CalculatorForm
                productName={product.name}
                productVariantEntityId={activeVariant?.entityId}
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
    ${ProductColorGrid.fragments.product}
    fragment ProductShowPageHeroProductFragment on Product {
      ...ProductColorGridProductFragment
      id
      entityId
      name
      defaultImage {
        urlOriginal
        altText
        url(width: 300)
      }

      variants(first: 250) {
        edges {
          node {
            id
            entityId
            defaultImage {
              url(width: 300)
              altText
            }
            options {
              edges {
                node {
                  values {
                    edges {
                      node {
                        entityId
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
}

export default ProductShowPageHero
