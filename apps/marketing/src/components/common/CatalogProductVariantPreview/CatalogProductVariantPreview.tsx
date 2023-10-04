import { gql } from '@apollo/client'
import { CatalogProductVariantPreviewProductFragment } from '@generated/CatalogProductVariantPreviewProductFragment'
import { generateImageSizes } from '@lib/utils/image'
import Image from 'next/image'
import React from 'react'
import CatalogProductColorGrid from '../CatalogProductColorGrid'

interface Props {
  product: CatalogProductVariantPreviewProductFragment
  activeVariantId?: string | null
}

const CatalogProductVariantPreview = ({ product, activeVariantId }: Props) => {
  const productVariants = product.variants.edges?.map(edge => edge?.node)

  const activeVariant = React.useMemo(
    () =>
      productVariants?.find(variant => {
        return variant?.id === activeVariantId
      }) || productVariants?.[0],
    [activeVariantId, productVariants],
  )

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
            sizes={generateImageSizes([{ imageWidth: '700px' }])}
          />
        </div>
      ) : null}
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
        url(width: 700)
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
          }
        }
      }
    }
  `,
}

export default CatalogProductVariantPreview
