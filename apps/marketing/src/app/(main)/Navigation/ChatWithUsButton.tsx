'use client'

import IntercomButton from '@components/common/IntercomButton'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface Props {}

const ChatWithUsButton = (props: Props) => {
  return (
    <IntercomButton
      as={
        <button
          onClick={() => {}}
          className="text-xs text-gray-200 flex flex-row items-center gap-2 px-2 py-1 ring-1 ring-gray-200 rounded-md"
        >
          <ChatBubbleLeftRightIcon className="w-4 h-4" /> Chat with us
        </button>
      }
    />
  )
}

export default ChatWithUsButton
