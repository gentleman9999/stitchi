import { notEmpty } from '@lib/utils/typescript'
import React from 'react'
import dynamic from 'next/dynamic'
import { CatalogProductVariantPreviewProductFragment } from '@generated/types'
import Image from 'next/image'

const ImageFullScreenBase = dynamic(
  () => import('../ImageFullScreen').then(mod => mod.ImageFullScreenBase),
  {
    ssr: false,
  },
)

interface Props {
  product: CatalogProductVariantPreviewProductFragment
  activeVariantId: string | null
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
        <div className="relative flex-1 overflow-hidden">
          <Image
            fill
            priority
            src={image.url}
            alt={product.name || 'Product image'}
            onClick={() => setShowFullScreen(true)}
            className="cursor-zoom-in hover:opacity-80 transition-all object-contain"
            sizes="(max-width: 717px) 98vw, 776px"
          />
        </div>

        {secondaryImages?.length ? (
          <div className="flex overflow-x-scroll">
            {activeVariant?.defaultImage?.url ? (
              <Image
                src={activeVariant.defaultImage.url}
                alt={product.name || 'Secondary image'}
                width={70}
                height={70}
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
