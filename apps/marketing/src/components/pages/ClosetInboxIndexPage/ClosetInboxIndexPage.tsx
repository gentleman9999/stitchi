import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import { Badge, IconButton } from '@components/ui'
import Button from '@components/ui/ButtonV2/Button'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  InboxIcon,
} from '@heroicons/react/20/solid'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
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

const messages: Message[] = [
  {
    id: '1',
    title: 'Your design has been approved!',
    date: new Date().toISOString(),
    unread: true,
    actions: [
      {
        label: 'View design',
        href: '#',
      },
    ],
  },
  {
    id: '2',
    title: 'Your design has been approved!',
    date: new Date().toISOString(),
    actions: [
      {
        label: 'View design',
        href: '#',
      },
    ],
  },
]

interface Props {}

const ClosetInboxIndexPage = ({}: Props) => {
  const unreadCount = messages.filter(message => message.unread).length

  return (
    <ClosetPageContainer>
      <ClosetPageHeader>
        <ClosetPageTitle title={`Inbox (${unreadCount})`} />
      </ClosetPageHeader>
      <ClosetSection>
        <div className="border rounded-md mt-6 bg-paper">
          {messages.length ? (
            <div className="flex flex-col divide-y">
              {messages.map(message => (
                <div
                  key={message.id}
                  className="flex justify-between items-center"
                >
                  <div className="px-4 py-4">
                    <p className="text-base font-medium text-gray-700 flex gap-2 items-center">
                      {message.title}

                      {message.unread ? (
                        <Badge label="New" size="small" />
                      ) : null}
                    </p>
                    <p className="text-gray-600 text-xs">
                      {format(parseISO(message.date), 'PPPpp')}
                    </p>
                  </div>
                  {message.actions && message.actions.length ? (
                    <div className="flex gap-4 px-8">
                      {message.actions.map(action => (
                        <Button
                          Component={Link}
                          href={action.href}
                          key={action.label}
                          variant="ghost"
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}

              <div className="grid grid-cols-3 py-2 px-4 text-sm">
                <div className="flex items-center">
                  {messages.length} notifications
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

export default ClosetInboxIndexPage
