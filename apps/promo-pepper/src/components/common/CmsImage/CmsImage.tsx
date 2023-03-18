import { FragmentType, getFragmentData, gql } from '@/__generated__'
import React from 'react'
import DatoCmsImageWrapper from '../DatoCmsImageWrapper'

export type CmsImageProps = Omit<
  React.ComponentProps<typeof DatoCmsImageWrapper>,
  'data'
> & {
  data: FragmentType<typeof CmsImageFragment>
}

/**
 * Learn more: https://github.com/datocms/react-datocms#progressiveresponsive-image
 */
const CmsImage = (props: CmsImageProps) => {
  const { data, ...rest } = props
  const image = getFragmentData(CmsImageFragment, props.data)

  // eslint-disable-next-line jsx-a11y/alt-text
  return <DatoCmsImageWrapper {...rest} data={image} />
}

export const CmsImageFragment = gql(/* GraphQL */ `
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
`)

export default CmsImage
