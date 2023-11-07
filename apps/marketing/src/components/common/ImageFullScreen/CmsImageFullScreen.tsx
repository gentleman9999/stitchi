import { gql } from '@apollo/client'
import React from 'react'
import CmsImage from '../CmsImage'
import ImageFullScreenBase, {
  Props as ImageFullScreenBaseProps,
} from './ImageFullScreenBase'
import { CmsImageFullScreenImageFragment } from '@generated/types'

interface Props extends Omit<ImageFullScreenBaseProps, 'children'> {
  image: CmsImageFullScreenImageFragment
}

const CmsImageFullScreen = ({ image, ...rest }: Props) => {
  return (
    <ImageFullScreenBase {...rest}>
      <CmsImage
        data={image}
        layout="responsive"
        objectFit="contain"
        style={{ position: 'unset' }}
        placeholderStyle={{
          position: 'unset',
        }}
      />
    </ImageFullScreenBase>
  )
}

CmsImageFullScreen.fragments = {
  image: gql`
    fragment CmsImageFullScreenImageFragment on ResponsiveImage {
      ...CmsImageFragment
    }
  `,
}

export default CmsImageFullScreen
