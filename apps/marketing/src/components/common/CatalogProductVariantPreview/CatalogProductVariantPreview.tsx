import { gql } from '@apollo/client'
import { CatalogProductVariantPreviewProductFragment } from '@generated/CatalogProductVariantPreviewProductFragment'
import { generateImageSizes } from '@lib/utils/image'
import { notEmpty } from '@lib/utils/typescript'
import Image from 'next/image'
import React from 'react'
import CatalogProductColorGrid from '../CatalogProductColorGrid'
import dynamic from 'next/dynamic'

const ImageFullScreenBase = dynamic(
  () => import('../ImageFullScreen').then(mod => mod.ImageFullScreenBase),
  {
    ssr: false,
  },
)

interface Props {
  product: CatalogProductVariantPreviewProductFragment
  activeVariantId?: string | null
}

const CatalogProductVariantPreview = ({ product, activeVariantId }: Props) => {
  const [showFullScreen, setShowFullScreen] = React.useState<boolean>(false)
  const [activeSecondaryImage, setActiveSecondaryImage] = React.useState<{
    url: string
  } | null>(null)

  const productVariants = product.variants.edges?.map(edge => edge?.node)

  const activeVariant = React.useMemo(
    () =>
      productVariants?.find(variant => {
        return variant?.id === activeVariantId
      }) || productVariants?.[0],
    [activeVariantId, productVariants],
  )

  React.useEffect(() => {
    // Anytime the active variant changes, reset the secondary image
    setActiveSecondaryImage(null)
  }, [activeVariantId])

  const image =
    activeSecondaryImage || activeVariant?.defaultImage || product.defaultImage

  if (!image) {
    return null
  }

  const secondaryImages = product.images.edges
    ?.map(edge => edge?.node)
    .filter(notEmpty)

  return (
    <>
      {showFullScreen ? (
        <ImageFullScreenBase open onClose={() => setShowFullScreen(false)}>
          <Image
            fill
            src={image.url}
            alt={product.name}
            style={{
              objectFit: 'contain',
            }}
          />
        </ImageFullScreenBase>
      ) : null}
      <div
        className={`relative w-full h-[calc(100vh-var(--topbar-height))] flex flex-col`}
      >
        <div className="relative flex-1">
          <Image
            fill
            priority
            key={image.url}
            src={image.url}
            alt={product.name}
            sizes={generateImageSizes([{ imageWidth: '700px' }])}
            style={{
              objectFit: 'contain',
            }}
            onClick={() => setShowFullScreen(true)}
            className="cursor-zoom-in hover:opacity-80 transition-all"
          />
        </div>

        {secondaryImages?.length ? (
          <div className="flex h-70">
            {activeVariant?.defaultImage ? (
              <Image
                src={activeVariant.defaultImage.url}
                alt={product.name}
                width={70}
                height={70}
                sizes={generateImageSizes([{ imageWidth: '70px' }])}
                style={{
                  objectFit: 'contain',
                  cursor: 'pointer',
                }}
                onClick={() =>
                  setActiveSecondaryImage(activeVariant.defaultImage)
                }
              />
            ) : null}

            {secondaryImages.map(image => {
              if (!image || image.isDefault) return null
              return (
                <Image
                  key={image.url}
                  src={image.url}
                  alt={product.name}
                  width={70}
                  height={70}
                  sizes={generateImageSizes([{ imageWidth: '70px' }])}
                  style={{
                    objectFit: 'contain',
                    cursor: 'pointer',
                  }}
                  onClick={() => setActiveSecondaryImage(image)}
                />
              )
            })}
          </div>
        ) : null}
      </div>
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
      }

      images(first: 10) {
        edges {
          node {
            isDefault
            url(width: 700)
          }
        }
      }

      variants(first: $variantsFirst) {
        edges {
          node {
            id
            entityId
            defaultImage {
              isDefault
              url(width: 700)
            }
          }
        }
      }
    }
  `,
}

export default CatalogProductVariantPreview
