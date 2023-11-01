'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import Notification from '@components/pages/ClosetInboxIndexPage/Notification'
import LoadingDots from '@components/ui/LoadingDots'
import Skeleton from '@components/ui/Skeleton'
import {
  SlideOver,
  SlideOverContent,
  SlideOverHeader,
} from '@components/ui/SlideOver'
import {
  NotificationsSlideoverGetDataQuery,
  NotificationsSlideoverGetDataQueryVariables,
} from '@generated/types'
import { InboxIcon } from '@heroicons/react/20/solid'
import { notEmpty } from '@lib/utils/typescript'
import { useInView } from 'framer-motion'
import React, { Suspense, useTransition } from 'react'

const PAGE_LIMIT = 10

interface Props {
  onClose: () => void
}

const NotificationSlideover = (props: Props) => {
  return (
    <SlideOver
      open
      className="sm:w-full sm:max-w-xl z-40"
      onOpenChange={() => {
        props.onClose()
      }}
    >
      <SlideOverHeader title="Notifications" />
      <SlideOverContent disablePadding>
        <Suspense
          fallback={
            <div className="flex flex-col items-center gap-4 divide-y">
              {Array.from(new Array(PAGE_LIMIT)).map((_, index) => (
                <div className="w-full p-4" key={index}>
                  <Skeleton width={80} />
                  <Skeleton width="90%" />
                </div>
              ))}
            </div>
          }
        >
          <SlideOverData />
        </Suspense>
      </SlideOverContent>
    </SlideOver>
  )
}

const SlideOverData = () => {
  const [isPending, startTransition] = useTransition()
  const fetchMoreTrigger = React.useRef<HTMLDivElement>(null)
  const shouldFetchMore = useInView(fetchMoreTrigger)

  const { data, fetchMore } = useSuspenseQuery<
    NotificationsSlideoverGetDataQuery,
    NotificationsSlideoverGetDataQueryVariables
  >(GET_DATA, {
    fetchPolicy: 'cache-and-network',
    variables: {
      first: PAGE_LIMIT,
    },
  })

  const { pageInfo } = data.viewer?.notifications || {}

  const notifications =
    data.viewer?.notifications?.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  React.useEffect(() => {
    if (
      !isPending &&
      shouldFetchMore &&
      pageInfo?.endCursor &&
      pageInfo.hasNextPage
    ) {
      startTransition(async () => {
        await fetchMore({
          variables: {
            after: pageInfo.endCursor,
          },
        })
      })
    }
  }, [
    fetchMore,
    isPending,
    pageInfo?.endCursor,
    pageInfo?.hasNextPage,
    shouldFetchMore,
  ])

  return (
    <>
      {notifications.length ? (
        <div className="flex flex-col divide-y">
          {notifications.map(notification => {
            const channel = notification.channels.find(
              channel => channel?.__typename === 'NotificationChannelWeb',
            )

            if (!channel || channel.__typename !== 'NotificationChannelWeb') {
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

          {isPending ? (
            <div className="flex justify-center py-4 w-full">
              <LoadingDots />
            </div>
          ) : (
            <div ref={fetchMoreTrigger} />
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 p-8">
          <InboxIcon className="w-10 h-10 text-gray-300" />
          <p className="text-2xl font-semibold">Nothing in your inbox yet :)</p>
        </div>
      )}
    </>
  )
}

const GET_DATA = gql`
  query NotificationsSlideoverGetDataQuery($first: Int, $after: String) {
    viewer {
      id

      notifications(first: $first, after: $after) {
        edges {
          node {
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
        }

        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`

export default NotificationSlideover
