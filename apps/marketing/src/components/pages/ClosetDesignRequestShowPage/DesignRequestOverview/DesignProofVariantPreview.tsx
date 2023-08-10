import React from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  DesignProofPreviewGetDataQuery,
  DesignProofPreviewGetDataQueryVariables,
} from '@generated/DesignProofPreviewGetDataQuery'
import { LoadingDots } from '@components/ui'

interface Props {
  designProofId: string
  activeColorId?: string | null
}

const DesignProofVariantPreview = ({ designProofId, activeColorId }: Props) => {
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

  const activeImage = React.useMemo(
    () => activeColor?.images?.find(image => image.id === activeImageId),
    [activeColor, activeImageId],
  )

  return (
    <div>
      <div className="w-full h-full max-h-[60vh]  bg-gray-50 rounded-md overflow-hidden">
        {activeImage ? (
          <img
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
    </div>
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
