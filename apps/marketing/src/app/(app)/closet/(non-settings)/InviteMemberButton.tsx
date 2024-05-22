'use client'

import { RectangleStackIcon } from '@heroicons/react/20/solid'
import { StandoutType, useStandout } from 'app/standout'
import React from 'react'

const InviteMemberButton = () => {
  const { setStandout } = useStandout()

  return (
    <button
      className="hover:bg-gray-50 rounded-sm p-2 w-full text-sm font-medium flex items-center gap-2 text-gray-500"
      onClick={() =>
        setStandout({
          type: StandoutType.UserInvite,
        })
      }
    >
      <div className="w-5 h-5 inline-flex items-center justify-center">
        <RectangleStackIcon className="w-4 h-4" />
      </div>
      Invite members
    </button>
  )
}

export default InviteMemberButton
