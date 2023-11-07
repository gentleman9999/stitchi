import React from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  DesignProofPreviewGetDataQuery,
  DesignProofPreviewGetDataQueryVariables,
} from '@generated/DesignProofPreviewGetDataQuery'
import ColorSwatch from '@components/common/ColorSwatch'
import LoadingDots from '@components/ui/LoadingDots'
import { InputGroup } from '@components/ui/inputs'
import {
  ImageFullScreen,
  useImageFullScreen,
} from '@components/common/ImageFullScreen'

interface Props {
  designProofId: string
}

const DesignProofVariantPreview = ({ designProofId }: Props) => {
  const [activeColorId, setActiveColorId] = React.useState<string | null>(null)

  const [activeImageId, setActiveImageId] = React.useState<string | null>(null)

  const { data, loading } = useQuery<
    DesignProofPreviewGetDataQuery,
    DesignProofPreviewGetDataQueryVariables
  >(GET_DATA, { variables: { designProofId } })

  const { designProof } = data || {}

  const { colors } = designProof || {}

  const activeColor = React.useMemo(
    () => colors?.find(color => color.catalogProductColorId === activeColorId),
    [colors, activeColorId],
  )

  const {
    currentImage,
    setActiveImageId: setPreviewImageId,
    ...imageFullScreenProps
  } = useImageFullScreen({
    images: activeColor?.images || [],
  })

  React.useEffect(() => {
    if (!activeImageId && activeColor) {
      setActiveImageId(activeColor?.images[0]?.id)
    }
  }, [activeColor, activeImageId])

  React.useEffect(() => {
    if (
      !activeColor?.images.find(image => image.id === activeImageId) &&
      activeColor?.images[0]?.id
    ) {
      setActiveImageId(activeColor.images[0].id)
    }
  }, [activeColor?.images, activeImageId])

  React.useEffect(() => {
    if (!activeColorId && colors?.length) {
      setActiveColorId(colors[0].catalogProductColorId)
    }
  }, [activeColorId, colors])

  const activeImage = React.useMemo(
    () => activeColor?.images?.find(image => image.id === activeImageId),
    [activeColor, activeImageId],
  )

  return (
    <>
      {currentImage && (
        <ImageFullScreen
          open
          {...imageFullScreenProps}
          image={{
            src: currentImage.url,
            alt: designProof?.id || 'Preview image',
          }}
        />
      )}

      <div>
        <div className="w-full h-full max-h-[60vh]  bg-gray-50 rounded-md overflow-hidden">
          {activeImage ? (
            <img
              src={activeImage?.url}
              width={activeImage?.width}
              height={activeImage?.height}
              className="w-full h-full max-h-[60vh] aspect-square object-contain cursor-zoom-in hover:scale-105 overflow-hidden transition-all rounded-md"
              onClick={() => setPreviewImageId(activeImage.id)}
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
              onClick={() => setActiveImageId(image.id)}
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
        <InputGroup label="Colors">
          <ul className="flex items-center mt-4 gap-1">
            {colors?.map(color => (
              <ColorSwatch
                key={color.catalogProductColorId}
                hexCode={color.hexCode || ''}
                label={color.name || ''}
                selected={activeColorId === color.catalogProductColorId}
                onClick={() => setActiveColorId(color.catalogProductColorId)}
              />
            ))}
          </ul>
        </InputGroup>
      </div>
    </>
  )
}

const GET_DATA = gql`
  query DesignProofPreviewGetDataQuery($designProofId: ID!) {
    designProof(id: $designProofId) {
      id
      createdAt

      colors {
        id
        catalogProductColorId
        hexCode
        name
        images {
          id
          url
          width
          height
        }
      }
    }
  }
`

export default DesignProofVariantPreview
