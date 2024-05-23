import { gql } from '@apollo/client'
import { CmsResponsiveImageFragment } from '@generated/types'
import React from 'react'
import { Image } from 'react-datocms'

export type CmsResponsiveImageProps = Omit<
  React.ComponentProps<typeof Image>,
  'data'
> & {
  data: CmsResponsiveImageFragment
}

/**
 * Learn more: https://github.com/datocms/react-datocms#progressiveresponsive-image
 */
const CmsResponsiveImage = (props: CmsResponsiveImageProps) => {
  const data = { ...props.data }

  Object.keys(data).forEach(key => {
    if (data[key as keyof CmsResponsiveImageFragment] === undefined) {
      data[key as keyof CmsResponsiveImageFragment] = null
    }
  })

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} data={data as any} />
}

CmsResponsiveImage.fragments = {
  image: gql`
    fragment CmsResponsiveImageFragment on ResponsiveImage {
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

export default CmsResponsiveImage
