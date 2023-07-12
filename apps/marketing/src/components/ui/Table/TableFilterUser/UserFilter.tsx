import UserAvatar from '@components/common/UserAvatar'
import { Check } from 'icons'
import React from 'react'

import cx from 'classnames'

export type UserId = string | null

interface Props {
  value: UserId
  onChange: (value: UserId) => Promise<void> | void
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
      {Array.from({ length: 10 }).map((_, i) => (
        <button
          key={i}
          onClick={() => props.onChange(i.toString())}
          className={cx(
            'flex items-center gap-2 text-sm justify-between hover:bg-primary p-1 rounded-sm',
            {
              'font-bold': i === 1,
            },
          )}
        >
          <div className="flex items-center gap-2">
            <UserAvatar
              width="w-6"
              height="h-6"
              user={{
                name: 'John Doe',
                picture: 'https://i.pravatar.cc/300',
              }}
            />
            <span>John Doe</span>
          </div>
          {i === 1 ? (
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
