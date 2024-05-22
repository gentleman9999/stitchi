'use client'

import React from 'react'
import { useIntercom } from 'react-use-intercom'
import ContactMethod from './ContactMethod'

const LiveChatContactMethod = () => {
  const { showNewMessage } = useIntercom()

  return (
    <ContactMethod
      title="Live Chat"
      label="Chat now"
      onClick={() => showNewMessage()}
    />
  )
}

export default LiveChatContactMethod
