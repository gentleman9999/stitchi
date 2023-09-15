import { format, parseISO } from 'date-fns'
import React from 'react'
import cx from 'classnames'
import UserAvatar from '@components/common/UserAvatar'
import { gql } from '@apollo/client'
import { ClosetSettingsTeamPageTableDesktopMembershipFragment } from '@generated/ClosetSettingsTeamPageTableDesktopMembershipFragment'
import { Badge } from '@components/ui'

interface Props {
  memberships: ClosetSettingsTeamPageTableDesktopMembershipFragment[]
}

const ClosetSettingsTeamPageTableDesktop = ({ memberships }: Props) => {
  return (
    <div
      className="flex w-full"
      // style={{ gridTemplateColumns: '150px repeat(3, 1fr)' }}
    >
      {memberships?.map(membership => (
        <>
          <Cell>
            <UserAvatar width="w-10" height="h-10" />
          </Cell>
          <Cell>
            <div className="flex flex-col">
              <div className="font-medium">{membership.user?.name}</div>
              <span className="text-gray-500 text-xs">
                {membership.user?.email}
              </span>
            </div>
          </Cell>
          <Cell className="text-gray-500 flex-1 flex justify-center">
            <span className="text-xs">
              Member since {format(parseISO(membership.createdAt), 'P')}
            </span>
          </Cell>
          <Cell right className="flex-1">
            <div>
              <Badge label={membership.humanizedRole || 'No role'} />
            </div>
          </Cell>
        </>
      ))}
    </div>
  )
}

const Cell = ({
  children,
  right,
  className,
}: {
  children?: React.ReactNode
  right?: boolean
  className?: string
}) => {
  return (
    <div
      className={cx(
        className,
        'border-b px-2 py-3 flex flex-col justify-center',
        {
          'items-end': right,
        },
      )}
    >
      {children}
    </div>
  )
}

ClosetSettingsTeamPageTableDesktop.fragments = {
  membership: gql`
    fragment ClosetSettingsTeamPageTableDesktopMembershipFragment on Membership {
      id
      createdAt
      humanizedRole
      user {
        id
        name
        email
      }
    }
  `,
}

export default ClosetSettingsTeamPageTableDesktop
