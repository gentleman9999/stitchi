import { gql } from '@apollo/client'
import { AvatarImageFragment } from '@generated/AvatarImageFragment'
import React from 'react'
import CmsImage from '../CmsImage'

export interface AvatarProps {
  image: AvatarImageFragment
}

const Avatar = (props: AvatarProps) => {
  return (
    <div className="h-10 w-10 rounded-full relative overflow-hidden">
      <CmsImage data={props.image} layout="fill" objectFit="cover" />
    </div>
  )
}

Avatar.fragments = {
  image: gql`
    ${CmsImage.fragments.image}
    fragment AvatarImageFragment on ResponsiveImage {
      ...CmsImageFragment
    }
  `,
}

export default Avatar
