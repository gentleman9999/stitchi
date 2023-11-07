import React from 'react'
import ImageFullScreenBase, {
  Props as ImageFullScreenBaseProps,
} from './ImageFullScreenBase'
import Image, { ImageProps } from 'next/image'

interface Props extends Omit<ImageFullScreenBaseProps, 'children'> {
  image: ImageProps
}

const ImageFullScreen = ({ image, ...rest }: Props) => {
  return (
    <ImageFullScreenBase {...rest}>
      <Image {...image} fill style={{ objectFit: 'contain' }} />
    </ImageFullScreenBase>
  )
}

export default ImageFullScreen
