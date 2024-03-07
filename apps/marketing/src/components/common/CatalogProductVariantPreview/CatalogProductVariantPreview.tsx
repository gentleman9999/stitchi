import { generateImageSizes } from '@lib/utils/image'
import { notEmpty } from '@lib/utils/typescript'
import Image from 'next/image'
import React from 'react'
import dynamic from 'next/dynamic'
import { CatalogProductVariantPreviewProductFragment } from '@generated/types'

const ImageFullScreenBase = dynamic(
  () => import('../ImageFullScreen').then(mod => mod.ImageFullScreenBase),
  {
    ssr: false,
  },
)

interface Props {
  product: CatalogProductVariantPreviewProductFragment
  activeVariantId: string
}

const CatalogProductVariantPreview = ({ product, activeVariantId }: Props) => {
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

  const activeVariantImageGroupId = activeVariant?.metafields?.edges?.find(
    edge => edge?.node?.key === 'image_group',
  )?.node?.value

  React.useEffect(() => {
    // Anytime the active variant changes, reset the secondary image
    setActiveSecondaryImage(null)
  }, [activeVariantId])

  const image =
    activeSecondaryImage || activeVariant?.defaultImage || product.defaultImage

  if (!image?.url) {
    return null
  }

  const secondaryImages = product.allImages
    .filter(node => {
      const productImageGroupId = node?.urlStandard
        ?.split('/')
        .pop()
        ?.split('_')[0]

      return productImageGroupId === activeVariantImageGroupId
    })
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
              if (!image.urlThumbnail) return null
              return (
                <Image
                  key={image.urlThumbnail}
                  src={image.urlThumbnail}
                  alt={product.name || "Product's secondary image"}
                  width={70}
                  height={70}
                  sizes={generateImageSizes([{ imageWidth: '70px' }])}
                  style={{
                    objectFit: 'contain',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    if (image.urlZoom) {
                      setActiveSecondaryImage({
                        url: image.urlZoom,
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
