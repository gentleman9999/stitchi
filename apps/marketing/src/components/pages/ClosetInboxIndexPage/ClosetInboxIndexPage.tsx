import { gql } from '@apollo/client'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import { IconButton, LoadingDots } from '@components/ui'
import {
  ClosetInboxIndexPageNotificationFragment,
  ClosetInboxIndexPageNotificationFragment_channels_NotificationChannelWeb,
} from '@generated/ClosetInboxIndexPageNotificationFragment'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  InboxIcon,
} from '@heroicons/react/20/solid'
import React from 'react'
import Notification from './Notification'

interface Props {
  loading?: boolean
  unreadCount: number
  notifications: ClosetInboxIndexPageNotificationFragment[]
  hasPreviousPage: boolean
  hasNextPage: boolean
  onPreviousPage: () => void
  onNextPage: () => void
}

const ClosetInboxIndexPage = ({
  loading,
  unreadCount,
  notifications,
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
}: Props) => {
  return (
    <ClosetPageContainer>
      <ClosetPageHeader>
        <ClosetPageTitle
          title={<>Inbox {unreadCount > 0 ? `(${unreadCount})` : null}</>}
        />
      </ClosetPageHeader>
      <ClosetSection>
        <div className="border rounded-md mt-6 bg-paper">
          {loading ? (
            <div className="h-[50vh] flex items-center justify-center">
              <LoadingDots />
            </div>
          ) : (
            <>
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
                      <Notification
                        notification={{
                          createdAt: notification.createdAt,
                          notificationId: notification.id,
                          ...channel,
                        }}
                        key={notification.id}
                      />
                    )
                  })}

                  <div className="grid grid-cols-3 py-2 px-4 text-sm">
                    <div className="flex items-center">
                      {/* {pluralize('notification', notifications.length, true)} */}
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <IconButton
                        size="sm"
                        onClick={onPreviousPage}
                        disabled={!hasPreviousPage}
                      >
                        <ChevronLeftIcon className="w-5 h-5" />
                      </IconButton>
                      <IconButton
                        size="sm"
                        onClick={onNextPage}
                        disabled={!hasNextPage}
                      >
                        <ChevronRightIcon className="w-5 h-5" />
                      </IconButton>
                    </div>
                    <div></div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 p-8">
                  <InboxIcon className="w-10 h-10 text-gray-300" />
                  <p className="text-2xl font-semibold">
                    No notifications yet!
                  </p>
                </div>
              )}
            </>
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

          ctaText
          ctaUrl

          seenAt
        }
      }
    }
  `,
}

export default ClosetInboxIndexPage
