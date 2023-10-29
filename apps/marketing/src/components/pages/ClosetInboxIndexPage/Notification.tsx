import Badge from '@components/ui/Badge'
import Button from '@components/ui/ButtonV2/Button'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import { format, parseISO } from 'date-fns'
import { useInView } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import useMarkNotificationAsSeen from './useMarkNotificationAsSeen'

interface Notification {
  notificationId: string
  message: string
  createdAt: string
  ctaText?: string | null
  ctaUrl?: string | null
  seenAt?: string | null
}

interface Props {
  notification: Notification
}

const Notification = ({ notification }: Props) => {
  const called = React.useRef(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const [markAsSeen] = useMarkNotificationAsSeen({
    notificationId: notification.notificationId,
  })

  React.useEffect(() => {
    if (!notification.seenAt && inView && !called.current) {
      markAsSeen()
      called.current = true
    }
  }, [inView, markAsSeen, notification.seenAt])

  return (
    <div className="flex justify-between items-center" ref={ref}>
      <div className="px-4 py-4">
        <p className="text-sm font-medium text-gray-900 flex gap-2 items-center">
          {notification.message}

          {/* TODO: Add view status */}
          {!notification.seenAt ? <Badge label="New" size="small" /> : null}
        </p>
        <p className="text-gray-600 text-xs">
          {format(parseISO(notification.createdAt), 'PPPpp')}
        </p>
      </div>
      {notification.ctaText && notification.ctaUrl ? (
        <div className="flex gap-4 px-8">
          <Button
            Component={
              notification.ctaText.startsWith(makeAbsoluteUrl('')) ? 'a' : Link
            }
            href={notification.ctaUrl}
            variant="ghost"
          >
            {notification.ctaText || 'View'}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default Notification
