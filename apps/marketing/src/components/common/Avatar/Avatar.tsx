import { gql } from '@apollo/client'
import { AvatarImageFragment } from '@generated/AvatarImageFragment'
import React from 'react'
import CmsImage from '../CmsImage'

export interface AvatarProps {
  image: AvatarImageFragment
}

const Avatar = (props: AvatarProps) => {
  return (
    <div className="h-12 w-12 rounded-full relative overflow-hidden">
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
    ${CmsImage.fragments.image}
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