import { CmsImageFragment } from '@/__generated__/graphql'
import { gql } from '@apollo/client'
import React from 'react'
import { Image } from 'react-datocms'

export type CmsImageProps = Omit<React.ComponentProps<typeof Image>, 'data'> & {
  data: CmsImageFragment
}

/**
 * Learn more: https://github.com/datocms/react-datocms#progressiveresponsive-image
 */
const CmsImage = (props: CmsImageProps) => {
  const data = { ...props.data }

  Object.keys(data).forEach(key => {
    if (data[key as keyof CmsImageFragment] === undefined) {
      data[key as keyof CmsImageFragment] = null
    }
  })

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} data={data as any} />
}

CmsImage.fragments = {
  image: gql`
    fragment CmsImage on ResponsiveImage {
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
