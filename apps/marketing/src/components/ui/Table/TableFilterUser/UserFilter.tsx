import UserAvatar from '@components/common/UserAvatar'
import { Check } from 'icons'
import React from 'react'
import cx from 'classnames'

interface User {
  id: string
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
    <div className="flex flex-col gap-2">
      <button
        onClick={() => props.onChange(null)}
        className="flex items-center gap-2 text-sm justify-between hover:bg-primary p-1 rounded-sm"
      >
        Any owner
      </button>
      {props.users.map((user, idx) => (
        <button
          key={user.id}
          onClick={() => props.onChange(user.id)}
          className={cx(
            'flex items-center gap-2 text-sm justify-between hover:bg-primary p-1 rounded-sm',
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
