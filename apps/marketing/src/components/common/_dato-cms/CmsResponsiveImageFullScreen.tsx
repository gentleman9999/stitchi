import { gql } from '@apollo/client'
import React from 'react'
import CmsResponsiveImage from './CmsResponsiveImage'
import ImageFullScreenBase, {
  Props as ImageFullScreenBaseProps,
} from '../ImageFullScreen/ImageFullScreenBase'
import { CmsResponsiveImageFullScreenImageFragment } from '@generated/types'

interface Props extends Omit<ImageFullScreenBaseProps, 'children'> {
  image: CmsResponsiveImageFullScreenImageFragment
}

const CmsResponsiveImageFullScreen = ({ image, ...rest }: Props) => {
  return (
    <ImageFullScreenBase {...rest}>
      <CmsResponsiveImage
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

CmsResponsiveImageFullScreen.fragments = {
  image: gql`
    ${CmsResponsiveImage.fragments.image}
    fragment CmsResponsiveImageFullScreenImageFragment on ResponsiveImage {
      ...CmsResponsiveImageFragment
    }
  `,
}

export default CmsResponsiveImageFullScreen
