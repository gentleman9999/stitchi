import { gql } from '@apollo/client'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import { Badge, IconButton } from '@components/ui'
import Button from '@components/ui/ButtonV2/Button'
import {
  ClosetInboxIndexPageNotificationFragment,
  ClosetInboxIndexPageNotificationFragment_channels_NotificationChannelWeb,
} from '@generated/ClosetInboxIndexPageNotificationFragment'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  InboxIcon,
} from '@heroicons/react/20/solid'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import pluralize from 'pluralize'
import React from 'react'

interface Action {
  label: string
  href: string
}

interface Message {
  id: string
  title: string
  date: string
  unread?: boolean
  actions?: Action[]
}

interface Props {
  notifications: ClosetInboxIndexPageNotificationFragment[]
}

const ClosetInboxIndexPage = ({ notifications }: Props) => {
  // const unreadCount = notifications.filter(message => message.unread).length

  return (
    <ClosetPageContainer>
      <ClosetPageHeader>
        <ClosetPageTitle title={`Inbox`} />
        {/* <ClosetPageTitle title={`Inbox (${unreadCount})`} /> */}
      </ClosetPageHeader>
      <ClosetSection>
        <div className="border rounded-md mt-6 bg-paper">
          {notifications.length ? (
            <div className="flex flex-col divide-y">
              {notifications.map(notification => {
                const channel = notification.channels.find(
                  (
                    channel,
                  ): channel is ClosetInboxIndexPageNotificationFragment_channels_NotificationChannelWeb => {
                    return Boolean(
                      channel?.__typename === 'NotificationChannelWeb',
                    )
                  },
                )

                if (!channel) {
                  return null
                }

                return (
                  <div
                    key={notification.id}
                    className="flex justify-between items-center"
                  >
                    <div className="px-4 py-4">
                      <p className="text-base font-medium text-gray-700 flex gap-2 items-center">
                        {channel.message}

                        {/* TODO: Add view status */}
                        {true ? <Badge label="New" size="small" /> : null}
                      </p>
                      <p className="text-gray-600 text-xs">
                        {format(parseISO(notification.createdAt), 'PPPpp')}
                      </p>
                    </div>
                    {channel.ctaUrl ? (
                      <div className="flex gap-4 px-8">
                        <Button
                          Component={Link}
                          href={channel.ctaUrl}
                          variant="ghost"
                        >
                          {channel.ctaLabel || 'View'}
                        </Button>
                      </div>
                    ) : null}
                  </div>
                )
              })}

              <div className="grid grid-cols-3 py-2 px-4 text-sm">
                <div className="flex items-center">
                  {pluralize('notification', notifications.length, true)}
                </div>
                <div className="flex justify-center items-center gap-2">
                  <IconButton size="sm">
                    <ChevronLeftIcon className="w-5 h-5" />
                  </IconButton>
                  <span>1 of 1</span>
                  <IconButton size="sm">
                    <ChevronRightIcon className="w-5 h-5" />
                  </IconButton>
                </div>
                <div></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 p-8">
              <InboxIcon className="w-10 h-10 text-gray-300" />
              <p className="text-2xl font-semibold">No notifications yet!</p>
            </div>
          )}
        </div>
      </ClosetSection>
    </ClosetPageContainer>
  )
}

ClosetInboxIndexPage.fragments = {
  notification: gql`
    fragment ClosetInboxIndexPageNotificationFragment on Notification {
      id

      createdAt

      channels {
        id

        ... on NotificationChannelWeb {
          message

          ctaUrl
          ctaLabel
        }
      }
    }
  `,
}

export default ClosetInboxIndexPage
