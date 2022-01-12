import { gql } from '@apollo/client'
import { CmsImageFragment } from '@generated/CmsImageFragment'
import React from 'react'
import { Image } from 'react-datocms'

export interface CmsImageProps extends React.ComponentProps<typeof Image> {
  data: CmsImageFragment
}

/**
 * Learn more: https://github.com/datocms/react-datocms#progressiveresponsive-image
 */
const CmsImage = (props: CmsImageProps) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} />
}

CmsImage.fragments = {
  image: gql`
    fragment CmsImageFragment on ResponsiveImage {
      srcSet
      webpSrcSet
      sizes
      src
      width
      height
      aspectRatio
      alt
      title
      base64
    }
  `,
}

export default CmsImage
