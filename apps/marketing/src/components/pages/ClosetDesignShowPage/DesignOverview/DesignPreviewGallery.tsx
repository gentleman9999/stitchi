import { gql } from '@apollo/client'
import { LoadingDots } from '@components/ui'
import { DesignPreviewGalleryDesignProductFragment } from '@generated/DesignPreviewGalleryDesignProductFragment'
import React from 'react'

interface Props {
  loading?: boolean
  design?: DesignPreviewGalleryDesignProductFragment | null
  activeColorId?: string | null
}

const DesignPreviewGallery = ({ design, activeColorId, loading }: Props) => {
  const activeColor =
    design?.colors.find(color => color.id === activeColorId) ||
    design?.colors[0]

  const [activeImage, setActiveImage] = React.useState(
    activeColor?.images[0] || null,
  )

  React.useEffect(() => {
    if (activeColor && !activeImage) {
      setActiveImage(activeColor.images[0])
    }
  }, [activeColor, activeImage])

  React.useEffect(() => {
    if (!activeColor?.images.find(image => image.id === activeImage?.id)) {
      setActiveImage(activeColor?.images[0] || null)
    }
  }, [activeColor?.images, activeImage?.id])

  return (
    <div className="w-full">
      <div className="w-full h-full max-h-[60vh]  bg-gray-50 rounded-md overflow-hidden">
        {activeImage ? (
          <img
            key={activeImage.id}
            src={activeImage?.url}
            width={activeImage?.width}
            height={activeImage?.height}
            className="w-full h-full max-h-[60vh] aspect-square object-contain"
          />
        ) : (
          <div className="w-full h-full max-h-[60vh] aspect-square bg-gray-50 flex items-center justify-center">
            {loading ? <LoadingDots /> : null}
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-4">
        {activeColor?.images.map(image => (
          <button
            key={image.id}
            onClick={() => setActiveImage(image)}
            className="w-16 h-16 rounded-md overflow-hidden"
          >
            <img
              src={image.url}
              width={image.width}
              height={image.height}
              className="w-full h-full aspect-square object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

DesignPreviewGallery.fragments = {
  designProduct: gql`
    fragment DesignPreviewGalleryDesignProductFragment on DesignProduct {
      id
      colors {
        id
        images {
          id
          url
          width
          height
        }
      }
    }
  `,
}

export default DesignPreviewGallery
