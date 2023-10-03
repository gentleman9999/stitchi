import { gql } from '@apollo/client'
import {
  CatalogProductVariantPreviewProductFragment,
  CatalogProductVariantPreviewProductFragment_variants_edges_node as ProductVariant,
} from '@generated/CatalogProductVariantPreviewProductFragment'
import { generateImageSizes } from '@lib/utils/image'
import Image from 'next/image'
import React from 'react'
import CatalogProductColorGrid from '../CatalogProductColorGrid'

interface ProductOptionValues {
  colorEntityId: number | null
  colorLabel: string | null
}

interface Props {
  product: CatalogProductVariantPreviewProductFragment
  onVariantChange?: (variant: ProductVariant | null) => void
}

const CatalogProductVariantPreview = ({ product, onVariantChange }: Props) => {
  const [productOptionValues, setProductOptionValues] =
    React.useState<ProductOptionValues>({
      colorEntityId: null,
      colorLabel: null,
    })

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

  React.useEffect(() => {
    onVariantChange?.(activeVariant || null)
  }, [activeVariant, onVariantChange])

  const image = activeVariant?.defaultImage || product.defaultImage

  return (
    <>
      {image ? (
        <div className="relative w-full h-[calc(100vh-56px)]">
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
      {/* <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <h3 className="text font-bold text-gray-700">Available Colors</h3>
          {productOptionValues.colorLabel ? (
            <span className="text-sm font-semibold text-gray-600">
              {productOptionValues.colorLabel}
            </span>
          ) : null}
        </div>
        <CatalogProductColorGrid
          product={product}
          onColorSelect={color => {
            setProductOptionValues({
              colorEntityId: color.colorEntityId,
              colorLabel: color.label,
            })
          }}
          selectedColorEntityIds={
            productOptionValues.colorEntityId
              ? [productOptionValues.colorEntityId]
              : []
          }
        />
      </div> */}
    </>
  )
}

CatalogProductVariantPreview.fragments = {
  product: gql`
    ${CatalogProductColorGrid.fragments.product}
    fragment CatalogProductVariantPreviewProductFragment on Product {
      ...CatalogProductColorGridProductFragment
      id
      name
      defaultImage {
        url(width: 600)
        altText
      }

      variants(first: $variantsFirst) {
        edges {
          node {
            id
            entityId
            defaultImage {
              url(width: 700)
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

export default CatalogProductVariantPreview
