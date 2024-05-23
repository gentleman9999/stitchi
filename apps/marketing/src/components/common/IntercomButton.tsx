'use client'

import React from 'react'
import { useIntercom } from 'react-use-intercom'

interface Props {
  message?: string
  as: React.ReactElement
}

const IntercomButton = (props: Props) => {
  const { showNewMessage } = useIntercom()

  return React.cloneElement(props.as, {
    onClick: (...params: any) => {
      showNewMessage(props.message)

      if ('onClick' in props.as) props.as.props.onClick?.(...params)
    },
  })
}

export default IntercomButton
