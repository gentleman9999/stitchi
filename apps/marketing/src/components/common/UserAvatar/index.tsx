import { gql } from '@apollo/client'
import { UserAvatarUserFragment } from '@generated/UserAvatarUserFragment'
import { User } from 'icons'
import React from 'react'

interface Props {
  user?: UserAvatarUserFragment | null
  width?: string
  height?: string
}

const UserAvatar = (props: Props) => {
  const { width = 'w-6', height = 'h-6', user } = props

  if (!user?.picture) {
    return (
      <div
        className={`${width} ${height} relative flex-none rounded-full bg-gray-100 flex items-center justify-center`}
      >
        {user?.name ? (
          user.name.slice(0, 1).toUpperCase()
        ) : (
          <User className="w-4 h-4 text-gray-400" />
        )}
      </div>
    )
  }

  return (
    <img
      src={user.picture || undefined}
      alt={user.name || 'avatar'}
      className={`${width} ${height} relative flex-none rounded-full bg-gray-50`}
    />
  )
}

UserAvatar.fragments = {
  user: gql`
    fragment UserAvatarUserFragment on User {
      id
      name
      picture
    }
  `,
}

export default UserAvatar
