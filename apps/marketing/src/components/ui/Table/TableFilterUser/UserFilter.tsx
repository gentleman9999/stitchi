import UserAvatar from '@components/common/UserAvatar'
import { Check } from 'icons'
import React from 'react'
import cx from 'classnames'

interface User {
  membershipId: string
  name: string
  picture?: string | null
}

type UserId = string | null

export interface Props {
  value: UserId
  onChange: (value: UserId) => Promise<void> | void
  users: User[]
}

const UserFilter = (props: Props) => {
  return (
    <div className="flex flex-col">
      <button
        onClick={() => props.onChange(null)}
        className="flex items-center gap-2 text-sm justify-between hover:bg-gray-50 ring-2 transition-all ring-transparent hover:ring-primary p-1.5 rounded-md"
      >
        Any owner
        {/* Makes up for avatar height */}
        <div className="h-6" />
      </button>
      {props.users.map((user, idx) => (
        <button
          key={user.membershipId}
          onClick={() => props.onChange(user.membershipId)}
          className={cx(
            'flex items-center gap-2 text-sm justify-between hover:gray ring-2 ring-transparent transition-all hover:ring-primary p-1.5 rounded-md',
            {
              'font-bold': idx === 1,
            },
          )}
        >
          <div className="flex items-center gap-2">
            <UserAvatar
              width="w-6"
              height="h-6"
              user={{
                name: user.name,
                picture: user.picture || null,
              }}
            />
            <span>{user.name}</span>
          </div>
          {idx === 1 ? (
            <div>
              <Check className="w-4 h-4" />
            </div>
          ) : null}
        </button>
      ))}
    </div>
  )
}

export default UserFilter
