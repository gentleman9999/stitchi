import { gql, useQuery } from '@apollo/client'
import UserAvatar from '@components/common/UserAvatar'
import { AppTopbarUserGetDataQuery } from '@generated/AppTopbarUserGetDataQuery'
import routes from '@lib/routes'
import React from 'react'
import NavItem from './NavItem'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import {
  ArrowPathRoundedSquareIcon,
  ArrowRightOnRectangleIcon,
  ChevronUpDownIcon,
  Cog6ToothIcon,
} from '@heroicons/react/20/solid'
import { Badge } from '@components/ui'
import { AppTopbarUserMembershipFragment } from '@generated/AppTopbarUserMembershipFragment'

interface Props {
  membership: AppTopbarUserMembershipFragment | null
}

const AppTopbarUser = ({ membership }: Props) => {
  const { humanizedRole, user, organization } = membership || {}

  if (!user || !organization) {
    return (
      <div className="flex items-center gap-6">
        <NavItem href={routes.internal.login.href()} label="Login" />
        <NavItem
          href={routes.internal.signup.href()}
          label="Place order"
          className="ring-2 ring-gray-900 rounded-sm px-2"
        />
      </div>
    )
  }

  return (
    <Dropdown.Root>
      <Dropdown.Trigger className="outline-none flex gap-2 text-left items-center hover:bg-gray-50 px-1 py-0.5 rounded-md">
        <div className="shrink-0 w-6 h-6 flex items-center justify-center">
          <UserAvatar
            width="w-6"
            height="h-6"
            user={{
              name: user.name || 'Unknown',
              picture: user.picture || null,
            }}
          />
        </div>
        <div className="text-xs sr-only sm:not-sr-only">
          <span className="font-semibold whitespace-nowrap">{user.name}</span>
          <br />
          <span className="text-gray-500">{organization.name}</span>
        </div>

        <div className="ml-auto">
          <ChevronUpDownIcon className="h-4" />
        </div>
      </Dropdown.Trigger>

      <Dropdown.Portal>
        <Dropdown.Content
          side="bottom"
          sideOffset={6}
          align="end"
          className="overflow-hidden rounded-md bg-paper shadow-lg flex flex-col border z-10 w-full min-w-[200px]"
        >
          <div className="bg-gray-50 p-4 w-full text-sm font-regular flex items-center gap-2 text-gray-800">
            <div className="text-xs">
              {humanizedRole ? (
                <>
                  <Badge
                    className="text-gray-500"
                    label={humanizedRole}
                    size="small"
                  />
                  <br />
                  <br />
                </>
              ) : null}
              <span className="font-semibold">{user.name}</span>
              <br />
              <span className="text-gray-500">{user.email?.toLowerCase()}</span>
            </div>
          </div>
          <div className="p-2">
            <DropdownItem
              href={routes.internal.closet.settings.general.href()}
              label="Settings"
              icon={<Cog6ToothIcon className="w-4 h-4" />}
            />
            <DropdownItem
              href={routes.internal.closet.memberships.href()}
              label="Switch workspace"
              icon={<ArrowPathRoundedSquareIcon className="w-4 h-4" />}
            />
            <DropdownItem
              LinkComponent="a"
              href={routes.internal.logout.href()}
              label="Sign Out"
              icon={<ArrowRightOnRectangleIcon className="w-4 h-4" />}
            />
          </div>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  )
}

const DropdownItem = ({
  label,
  href,
  icon,
  LinkComponent = Link,
}: {
  label: string
  href: string
  icon: React.ReactNode
  LinkComponent?: React.ElementType
}) => {
  return (
    <Dropdown.Item asChild>
      <LinkComponent
        href={href}
        className={
          'border-2 border-transparent hover:border-primary hover:bg-gray-50 transition-all py-2 px-2 rounded-md flex-1 flex items-center gap-2 outline-none text-sm font-medium'
        }
      >
        {icon}
        {label}
      </LinkComponent>
    </Dropdown.Item>
  )
}

AppTopbarUser.fragments = {
  membership: gql`
    fragment AppTopbarUserMembershipFragment on Membership {
      id
      humanizedRole
      organization {
        id
        name
      }
      user {
        id
        name
        email
        picture
      }
    }
  `,
}

export default AppTopbarUser
