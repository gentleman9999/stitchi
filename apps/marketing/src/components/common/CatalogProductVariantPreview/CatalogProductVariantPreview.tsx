import { CatalogProductVariantPreviewProductFragment } from '@generated/CatalogProductVariantPreviewProductFragment'
import { generateImageSizes } from '@lib/utils/image'
import { notEmpty } from '@lib/utils/typescript'
import Image from 'next/image'
import React from 'react'
import dynamic from 'next/dynamic'
import { useFragment } from '@apollo/experimental-nextjs-app-support/ssr'
import { fragments } from './CatalogProductVariantPreview.fragments'

const ImageFullScreenBase = dynamic(
  () => import('../ImageFullScreen').then(mod => mod.ImageFullScreenBase),
  {
    ssr: false,
  },
)

interface Props {
  productId: string
  activeVariantId?: string | null
}

const CatalogProductVariantPreview = ({
  productId,
  activeVariantId,
}: Props) => {
  const { data: product } =
    useFragment<CatalogProductVariantPreviewProductFragment>({
      fragment: fragments.product,
      fragmentName: 'CatalogProductVariantPreviewProductFragment',
      from: {
        __typename: 'Product',
        id: productId,
      },
    })
  const [showFullScreen, setShowFullScreen] = React.useState<boolean>(false)
  const [activeSecondaryImage, setActiveSecondaryImage] = React.useState<{
    url: string
  } | null>(null)

  const productVariants = product.variants?.edges?.map(edge => edge?.node)

  const activeVariant = React.useMemo(
    () =>
      productVariants?.find(variant => {
        return variant?.entityId?.toString() === activeVariantId
      }) || productVariants?.[0],
    [activeVariantId, productVariants],
  )

  React.useEffect(() => {
    // Anytime the active variant changes, reset the secondary image
    setActiveSecondaryImage(null)
  }, [activeVariantId])

  const image =
    activeSecondaryImage || activeVariant?.defaultImage || product.defaultImage

  if (!image?.url) {
    return null
  }

  const secondaryImages = product.images?.edges
    ?.map(edge => edge?.node)
    .filter(notEmpty)

  return (
    <>
      {showFullScreen ? (
        <ImageFullScreenBase open onClose={() => setShowFullScreen(false)}>
          <Image
            fill
            src={image.url}
            alt={product.name || 'Product image'}
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
            alt={product.name || 'Product image'}
            sizes={generateImageSizes([{ imageWidth: '700px' }])}
            style={{
              objectFit: 'contain',
            }}
            onClick={() => setShowFullScreen(true)}
            className="cursor-zoom-in hover:opacity-80 transition-all"
          />
        </div>

        {secondaryImages?.length ? (
          <div className="flex h-70 overflow-x-scroll">
            {activeVariant?.defaultImage?.url ? (
              <Image
                src={activeVariant.defaultImage.url}
                alt={product.name || 'Secondary image'}
                width={70}
                height={70}
                sizes={generateImageSizes([{ imageWidth: '70px' }])}
                style={{
                  objectFit: 'contain',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (activeVariant.defaultImage?.url) {
                    setActiveSecondaryImage({
                      url: activeVariant.defaultImage.url,
                    })
                  }
                }}
              />
            ) : null}

            {secondaryImages.map(image => {
              if (!image.url || image.isDefault) return null
              return (
                <Image
                  key={image.url}
                  src={image.url}
                  alt={product.name || "Product's secondary image"}
                  width={70}
                  height={70}
                  sizes={generateImageSizes([{ imageWidth: '70px' }])}
                  style={{
                    objectFit: 'contain',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    if (image.url) {
                      setActiveSecondaryImage({
                        url: image.url,
                      })
                    }
                  }}
                />
              )
            })}
          </div>
        ) : null}
      </div>
    </>
  )
}

export default CatalogProductVariantPreview
