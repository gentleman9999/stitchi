import { gql } from '@apollo/client'
import { Badge } from '@components/ui'
import { ClosetSettingsTeamPageTableMobileMemberFragment } from '@generated/ClosetSettingsTeamPageTableMobileMemberFragment'
import { format, parseISO } from 'date-fns'
import React from 'react'

interface Props {
  memberships: ClosetSettingsTeamPageTableMobileMemberFragment[]
}

const ClosetSettingsTeamPageTableMobile = ({ memberships }: Props) => {
  return (
    <div className="divide-y">
      {memberships.map(membership => (
        <div key={membership.id}>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-4 font-medium justify-between">
                <div className="flex flex-col">
                  {membership.user?.name}
                  <span className="text-gray-500 text-xs mb-1">
                    {membership.user?.email}
                  </span>
                </div>
                <Badge label={membership.humanizedRole || 'No role'} />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-gray-500 text-xs">
                  Member since {format(parseISO(membership.createdAt), 'PPP')}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

ClosetSettingsTeamPageTableMobile.fragments = {
  member: gql`
    fragment ClosetSettingsTeamPageTableMobileMemberFragment on Membership {
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

export default ClosetSettingsTeamPageTableMobile
