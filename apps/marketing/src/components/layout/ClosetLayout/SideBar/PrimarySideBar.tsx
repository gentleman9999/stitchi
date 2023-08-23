import React from 'react'
import OrganizationDropdown from '../OrganizationDropdown'
import {
  ChevronUpDownIcon,
  RectangleStackIcon,
} from '@heroicons/react/20/solid'
import { ScopeAction, ScopeResource } from '@generated/globalTypes'
import Link from 'next/link'
import { Badge, Logo } from '@components/ui'
import Skeleton from 'react-loading-skeleton'
import UserAvatar from '@components/common/UserAvatar'
import { gql } from '@apollo/client'
import NavItem from './NavItem'
import { useAuthorizedComponent } from '@lib/auth'
import { PrimarySideBarMembershipFragment } from '@generated/PrimarySideBarMembershipFragment'
import { useClosetLayoutContext } from '../closet-layout-context'

interface Props {
  loading: boolean
  membership?: PrimarySideBarMembershipFragment | null
}

const PrimarySideBar = ({ membership, loading }: Props) => {
  const { can, loading: authorizationLoading } = useAuthorizedComponent()
  const { navigation, activeNavItem, handleNavigate } = useClosetLayoutContext()

  const { user, organization } = membership || {}

  return (
    <div className="relative flex-1 flex flex-col p-2 gap-2 ">
      <OrganizationDropdown
        renderTrigger={() => (
          <div className="bg-gray-50 rounded-md p-2 w-full text-sm font-regular flex items-center gap-2 text-gray-800">
            <div className="w-5 h-5 bg-gray-100 rounded-sm" />
            {organization?.name}
            <div className="ml-auto">
              <ChevronUpDownIcon className="h-4" />
            </div>
          </div>
        )}
      />
      <div>
        <ul className="flex flex-col gap-1">
          {navigation.primary
            .filter(link => !link.hidden)
            .map(link => (
              <li key={link.href}>
                <NavItem
                  {...link}
                  active={activeNavItem?.href === link.href}
                  onClick={() => handleNavigate(link)}
                />
              </li>
            ))}
        </ul>
        <hr className="my-2" />
        <ul className="flex flex-col gap-1">
          {navigation.secondary.map(link => (
            <li key={link.label}>
              <NavItem
                {...link}
                active={activeNavItem?.href === link.href}
                onClick={() => handleNavigate(link)}
              />
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="mt-2 border rounded-md p-4 text-sm flex flex-col gap-4 text-gray-600 bg-gray-50">
        <div>
          <Badge label="Beta" size="small" severity="info" />
        </div>
        Welcome to our beta. We&apos;re still working out the kinks, so please
        let us know if you have any feedback.
        <Link href="/" className="underline font-medium">
          Submit feedback
        </Link>
      </div> */}

      <div className="flex-1 flex flex-col justify-end">
        <div>
          <div className="flex justify-center">
            <Logo className="w-10" />
          </div>

          <hr className="my-2" />

          <div className="flex items-center gap-2 p-2">
            <div className="shrink-0 w-5 h-5 flex items-center justify-center">
              {loading ? (
                <Skeleton />
              ) : (
                <>
                  <UserAvatar
                    width="w-5"
                    height="h-5"
                    user={{
                      name: user?.name || 'Unknown',
                      picture: user?.picture || null,
                    }}
                  />
                </>
              )}
            </div>
            <div className="text-xs">
              <span className="font-semibold">{user?.name}</span>
              <br />
              <span className="text-gray-500">
                {user?.email?.toLowerCase()}
              </span>
            </div>
          </div>
        </div>

        {!authorizationLoading &&
          can(ScopeResource.Membership, ScopeAction.CREATE) && (
            <button className="hover:bg-gray-50 rounded-md p-2 w-full text-sm font-medium flex items-center gap-2 text-gray-500">
              <div className="w-5 h-5 inline-flex items-center justify-center">
                <RectangleStackIcon className="w-4 h-4" />
              </div>
              Invite members
            </button>
          )}
      </div>
    </div>
  )
}

PrimarySideBar.fragments = {
  membership: gql`
    fragment PrimarySideBarMembershipFragment on Membership {
      id
      organization {
        id
        name
      }
      user {
        id
        name
        picture
        email
      }
    }
  `,
}

export default PrimarySideBar
