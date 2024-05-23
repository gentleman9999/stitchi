import { gql } from '@apollo/client'
import { AvatarImageFragment } from '@generated/AvatarImageFragment'
import React from 'react'
import CmsResponsiveImage from '../_dato-cms/CmsResponsiveImage'

export interface AvatarProps {
  image: AvatarImageFragment
}

const Avatar = (props: AvatarProps) => {
  if (!props.image.responsiveImage) {
    return null
  }
  return (
    <div className="h-7 w-7 sm:h-7 sm:w-8 md:h-10 md:w-10 rounded-full relative overflow-hidden">
      <CmsResponsiveImage
        data={props.image.responsiveImage}
        layout="fill"
        objectFit="cover"
      />
    </div>
  )
}

Avatar.fragments = {
  image: gql`
    ${CmsResponsiveImage.fragments.image}
    fragment AvatarImageFragment on FileField {
      id
      responsiveImage(
        imgixParams: { w: 50, h: 50, fit: crop, q: 80, auto: format }
      ) {
        ...CmsResponsiveImageFragment
      }
    }
  `,
}

export default Avatar
