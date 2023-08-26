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
      className="grid"
      style={{ gridTemplateColumns: '150px repeat(3, 1fr)' }}
    >
      <Cell className="text-sm font-semibold"></Cell>
      <Cell className="text-sm font-semibold">Name</Cell>
      <Cell className="text-sm font-semibold">Member Since</Cell>
      <Cell className="text-sm font-semibold">Role</Cell>

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
          <Cell className="text-gray-500 text-sm">
            {format(parseISO(membership.createdAt), 'PPP')}
          </Cell>
          <Cell>
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
