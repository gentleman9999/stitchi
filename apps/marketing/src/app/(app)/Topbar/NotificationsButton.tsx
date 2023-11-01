'use client'

import Button from '@components/ui/ButtonV2/Button'
import { BellAlertIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { useNotificationStandout } from '../notification-standout-context'

interface Props {}

const NotificationsButton = (props: Props) => {
  const { setOpen } = useNotificationStandout()
  return (
    <Button variant="ghost" onClick={() => setOpen(prev => !prev)}>
      <BellAlertIcon className="w-4 h-4" />
    </Button>
  )
}

export default NotificationsButton
