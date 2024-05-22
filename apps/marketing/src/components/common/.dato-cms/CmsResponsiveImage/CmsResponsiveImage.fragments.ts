import { gql } from '@apollo/client'

export const fragments = {
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
