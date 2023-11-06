'use client'

import Button from '@components/ui/ButtonV2/Button'
import React from 'react'
import { useNotificationStandout } from '../notification-standout-context'
import { BellAlertIcon } from '@heroicons/react/24/outline'
import { gql, useQuery } from '@apollo/client'
import {
  NotificationsButtonGetDataQuery,
  NotificationsButtonGetDataQueryVariables,
} from '@generated/types'

interface Props {}

const NotificationsButton = (props: Props) => {
  const { setOpen, open } = useNotificationStandout()
  const { data } = useQuery<
    NotificationsButtonGetDataQuery,
    NotificationsButtonGetDataQueryVariables
  >(GET_DATA, {
    fetchPolicy: 'cache-and-network',
  })

  const showIndicator = Boolean(
    !open && (data?.viewer?.unseenWebNotificationsCount ?? 0) > 0,
  )

  return (
    <Button variant="ghost" onClick={() => setOpen(prev => !prev)}>
      <BellAlertIcon className="w-4 h-4" />
      {showIndicator && (
        <div className="absolute -top-1 -right-1 rounded-full bg-primary h-3 w-3" />
      )}
    </Button>
  )
}

const GET_DATA = gql`
  query NotificationsButtonGetDataQuery {
    viewer {
      id
      unseenWebNotificationsCount
    }
  }
`

export default NotificationsButton
