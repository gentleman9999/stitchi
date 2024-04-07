'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import UserAvatar from '@components/common/UserAvatar'
import routes from '@lib/routes'
import React from 'react'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import {
  ArrowPathRoundedSquareIcon,
  ArrowRightOnRectangleIcon,
  ChevronUpDownIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid'
import Badge from '@components/ui/Badge'
import {
  AppLayoutGetDataQuery,
  AppLayoutGetDataQueryVariables,
} from '@generated/types'
import LinkInline from '@components/ui/LinkInline'
import ButtonV2 from '@components/ui/ButtonV2'
import { cn } from '@lib/utils'

interface Props {
  background?: 'light' | 'dark'
}

const AppTopbarUser = ({ background = 'light' }: Props) => {
  const { data } = useSuspenseQuery<
    AppLayoutGetDataQuery,
    AppLayoutGetDataQueryVariables
  >(GET_DATA)

  const { humanizedRole, user, organization } = data.viewer || {}

  return (
    <Dropdown.Root>
      <Dropdown.Trigger
        className={cn(
          'outline-none flex gap-2 text-left items-center px-1 py-0.5 rounded-sm',
          {
            'hover:bg-gray-50': background === 'light',
            'bg-white bg-opacity-0  hover:bg-opacity-5': background === 'dark',
          },
        )}
      >
        <div className="shrink-0 w-6 h-6 flex items-center justify-center">
          <UserAvatar
            width="w-6"
            height="h-6"
            user={{
              name: user?.name || null,
              picture: user?.picture || null,
            }}
          />
        </div>
        {user || organization ? (
          <div className="text-xs sr-only sm:not-sr-only">
            {user ? (
              <span
                className={cn('font-semibold whitespace-nowrap truncate', {
                  'text-gray-950': background === 'light',
                  'text-gray-100': background === 'dark',
                })}
              >
                {user.name}
              </span>
            ) : null}

            {user && organization && <br />}

            {organization ? (
              <span
                className={cn('text-gray-500 truncate', {
                  'text-gray-500': background === 'light',
                  'text-gray-300': background === 'dark',
                })}
              >
                {organization.name}
              </span>
            ) : null}
          </div>
        ) : null}

        <div className="ml-auto">
          <ChevronUpDownIcon
            className={cn('h-4', {
              'text-white': background === 'dark',
              'text-black': background === 'light',
            })}
          />
        </div>
      </Dropdown.Trigger>

      <Dropdown.Portal>
        <Dropdown.Content
          side="bottom"
          sideOffset={6}
          align="end"
          className="overflow-hidden rounded-sm bg-paper shadow-lg flex flex-col border z-50 w-full min-w-[200px]"
        >
          {user ? (
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
                <span className="text-gray-500">
                  {user.email?.toLowerCase()}
                </span>
              </div>
            </div>
          ) : null}

          <div className="p-2">
            {user ? (
              <AuthenticatedUserDropdownContent />
            ) : (
              <UnauthenticatedUserDropdownContent />
            )}
          </div>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  )
}

const AuthenticatedUserDropdownContent = () => {
  return (
    <div>
      <DropdownItem
        label="Closet"
        href={routes.internal.closet.href()}
        icon={<Squares2X2Icon className="w-4 h-4" />}
      />

      <DropdownItem
        href={routes.internal.account.memberships.href()}
        label="Workspaces"
        icon={<ArrowPathRoundedSquareIcon className="w-4 h-4" />}
      />

      <DropdownItem
        href={routes.internal.closet.settings.general.href()}
        label="Settings"
        icon={<Cog6ToothIcon className="w-4 h-4" />}
      />

      <DropdownItem
        LinkComponent="a"
        href={routes.internal.logout.href()}
        label="Sign out"
        icon={<ArrowRightOnRectangleIcon className="w-4 h-4" />}
      />
    </div>
  )
}

const UnauthenticatedUserDropdownContent = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <ButtonV2 href={routes.internal.login.href()} Component={Link}>
          Login
        </ButtonV2>

        <span className="text-xs">
          New customer?{' '}
          <LinkInline href={routes.internal.signup.href()}>
            Start here
          </LinkInline>
        </span>
      </div>

      <hr className="my-3" />

      <DropdownItem
        label="Closet"
        href={routes.internal.closet.href()}
        icon={<Squares2X2Icon className="w-4 h-4" />}
      />

      <DropdownItem
        href={routes.internal.account.memberships.href()}
        label="Workspaces"
        icon={<ArrowPathRoundedSquareIcon className="w-4 h-4" />}
      />

      <DropdownItem
        href={routes.internal.closet.settings.general.href()}
        label="Settings"
        icon={<Cog6ToothIcon className="w-4 h-4" />}
      />
    </div>
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
          'border-2 border-transparent hover:border-midnight hover:bg-gray-50 transition-all py-2 px-2 rounded-sm flex-1 flex items-center gap-2 outline-none text-sm font-medium'
        }
      >
        {icon}
        {label}
      </LinkComponent>
    </Dropdown.Item>
  )
}

const GET_DATA = gql`
  query AppLayoutGetDataQuery {
    viewer {
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
  }
`

export default AppTopbarUser
