import { format, parseISO } from 'date-fns'
import React from 'react'
import cx from 'classnames'
import UserAvatar from '@components/common/UserAvatar'
import { gql } from '@apollo/client'
import { ClosetSettingsTeamPageTableDesktopMembershipFragment } from '@generated/ClosetSettingsTeamPageTableDesktopMembershipFragment'
import { Badge, IconButton } from '@components/ui'
import { Dropdown, DropdownItem } from '@components/ui/Dropdown'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'

interface Props {
  memberships: ClosetSettingsTeamPageTableDesktopMembershipFragment[]
}

const ClosetSettingsTeamPageTableDesktop = ({ memberships }: Props) => {
  return (
    <div
      className="grid w-full"
      style={{ gridTemplateColumns: '50px 170px repeat(2, 1fr)' }}
    >
      {memberships?.map(membership => (
        <>
          <Cell>
            <UserAvatar width="w-10" height="h-10" />
          </Cell>
          <Cell>
            <div className="flex flex-col">
              <div className="font-medium text-sm truncate">
                {membership.user?.name}
              </div>
              <span className="text-gray-500 text-xs truncate">
                {membership.user?.email || membership.invitedEmail}
              </span>
            </div>
          </Cell>
          <Cell right className="flex-1">
            <div className="flex gap-2 items-center">
              <span className="text-sm text-gray-500">
                {membership.humanizedRole || 'No role'}
              </span>
              {!membership.user && (
                <div>
                  <Badge label="Pending" size="small" />
                </div>
              )}
            </div>
          </Cell>
          <Cell right>
            <Dropdown
              renderItems={() =>
                !membership.user
                  ? [
                      <DropdownItem
                        onClick={() => {}}
                        label="Resend invite"
                        key={1}
                      />,
                      <DropdownItem
                        onClick={() => {}}
                        label="Revoke invite"
                        key={1}
                      />,
                    ]
                  : []
              }
              renderTrigger={() => (
                <IconButton>
                  <EllipsisHorizontalIcon className="w-5" />
                </IconButton>
              )}
            />
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
      invitedEmail
      user {
        id
        name
        email
      }
    }
  `,
}

export default ClosetSettingsTeamPageTableDesktop
