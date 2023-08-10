import { gql } from '@apollo/client'
import { UserBadgeUserFramgent } from '@generated/UserBadgeUserFramgent'
import React from 'react'
import Skeleton, { SkeletonProps } from 'react-loading-skeleton'

interface Props {
  loading?: boolean
  user?: UserBadgeUserFramgent | null
}

const UserBadge = ({ user, loading }: Props) => {
  return (
    <div className="inline-flex items-center space-x-2">
      {user?.picture ? (
        <img
          className="w-6 h-6 rounded-full"
          src={user.picture}
          alt={user.name || 'Avatar'}
        />
      ) : (
        <div className="w-6 h-6 rounded-full bg-gray-200">
          {loading ? <Skeleton /> : null}
        </div>
      )}
      <span className="text-sm font-medium text-gray-700">
        {loading ? <Skeleton /> : user?.name || 'unknown'}
      </span>
    </div>
  )
}

UserBadge.fragments = {
  user: gql`
    fragment UserBadgeUserFramgent on User {
      id
      name
      picture
    }
  `,
}

export default UserBadge
