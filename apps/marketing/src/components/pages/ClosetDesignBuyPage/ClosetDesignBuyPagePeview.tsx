import { gql } from '@apollo/client'
import ColorSwatch from '@components/common/ColorSwatch'
import { ClosetDesignBuyPagePeviewDesignProductFragment } from '@generated/ClosetDesignBuyPagePeviewDesignProductFragment'

import { generateImageSizes } from '@utils/image'
import Image from 'next/image'
import React from 'react'

interface Props {
  loading?: boolean
  designProduct?: ClosetDesignBuyPagePeviewDesignProductFragment | null
}

const ClosetDesignBuyPagePeview = ({ designProduct }: Props) => {
  const [activeColor, setActiveColor] = React.useState(designProduct?.colors[0])
  const [activeImageId, setActiveImageId] = React.useState<string | null>(
    activeColor?.images[0]?.id || null,
  )

  React.useEffect(() => {
    if (!activeColor && designProduct?.colors.length) {
      setActiveColor(designProduct.colors[0])
    }
  }, [activeColor, designProduct?.colors])

  React.useEffect(() => {
    if (!activeImageId && activeColor?.images.length) {
      setActiveImageId(activeColor.images[0]?.id || null)
    }
  }, [activeImageId, activeColor?.images])

  React.useEffect(() => {
    if (!activeColor?.images.find(image => image.id === activeImageId)) {
      setActiveImageId(activeColor?.images[0]?.id || null)
    }
  }, [activeColor?.images, activeImageId])

  const image = activeColor?.images.find(image => image.id === activeImageId)

  return (
    <>
      <div className="relative w-full h-[350px] sm:h-[400px] border-b mt-8">
        {image ? (
          <Image
            fill
            priority
            style={{
              objectFit: 'contain',
            }}
            key={image.url}
            src={image.url}
            alt={designProduct?.name || 'Product image'}
            sizes={generateImageSizes([{ imageWidth: '624px' }])}
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <h3 className="text font-bold text-gray-700">Available Colors</h3>
          {activeColor?.name ? (
            <span className="text-sm font-semibold text-gray-600">
              {activeColor.name}
            </span>
          ) : null}
        </div>
        <ul className="flex flex-wrap gap-1">
          {designProduct?.colors.map(color => (
            <li key={color.catalogProductColorId}>
              <ColorSwatch
                onClick={() => setActiveColor(color)}
                hexCode={color.hex || '#000'}
                label={color.name || 'Unknown'}
                selected={activeColor?.id === color.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

ClosetDesignBuyPagePeview.fragments = {
  designProduct: gql`
    fragment ClosetDesignBuyPagePeviewDesignProductFragment on DesignProduct {
      id
      name
      description

      colors {
        id
        catalogProductColorId
        hex
        name
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

export default ClosetDesignBuyPagePeview
