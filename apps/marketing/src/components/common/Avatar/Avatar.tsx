import { gql } from '@apollo/client'
import { AvatarImageFragment } from '@generated/AvatarImageFragment'
import React from 'react'
import CmsImage, { CmsImageFragments } from '../CmsImage'

export interface AvatarProps {
  image: AvatarImageFragment
}

const Avatar = (props: AvatarProps) => {
  if (!props.image.responsiveImage) {
    return null
  }
  return (
    <div className="h-10 w-10 rounded-full relative overflow-hidden">
      <CmsImage
        data={props.image.responsiveImage}
        layout="fill"
        objectFit="cover"
      />
    </div>
  )
}

Avatar.fragments = {
  image: gql`
    ${CmsImageFragments.image}
    fragment AvatarImageFragment on FileField {
      id
      responsiveImage(
        imgixParams: { w: 50, h: 50, fit: crop, q: 80, auto: format }
      ) {
        ...CmsImageFragment
      }
    }
  `,
}

export default Avatar
