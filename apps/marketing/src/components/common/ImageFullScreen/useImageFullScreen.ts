import { queryTypes, useQueryState } from 'nuqs'
import React from 'react'

interface Image {
  id: string
}

interface Props<T extends any> {
  images: T[]
}

const useImageFullScreen = <T extends Image>({ images }: Props<T>) => {
  const [activeImageId, setActiveImageId] = useQueryState(
    'image',
    queryTypes.string,
  )

  const { nextImage, currentImage, prevImage } = React.useMemo(() => {
    let currentImage: T | null
    let nextImage: T | null
    let prevImage: T | null

    const currentIndex = images.findIndex(image => image.id === activeImageId)

    if (currentIndex >= 0) {
      currentImage = images[currentIndex]
      nextImage = images[currentIndex + 1]
      prevImage = images[currentIndex - 1]
    } else {
      currentImage = null
      nextImage = null
      prevImage = null
    }

    return {
      currentImage,
      nextImage,
      prevImage,
    }
  }, [activeImageId, images])

  const onNext = React.useCallback(() => {
    if (nextImage) {
      setActiveImageId(nextImage.id)
    }
  }, [nextImage, setActiveImageId])

  const onPrev = React.useCallback(() => {
    if (prevImage) {
      setActiveImageId(prevImage.id)
    }
  }, [prevImage, setActiveImageId])

  const onClose = () => {
    setActiveImageId(null)
  }

  const canNext = Boolean(nextImage)
  const canPrev = Boolean(prevImage)

  return {
    canNext,
    canPrev,
    currentImage,
    onNext,
    onPrev,
    setActiveImageId,
    onClose,
  }
}

export default useImageFullScreen
