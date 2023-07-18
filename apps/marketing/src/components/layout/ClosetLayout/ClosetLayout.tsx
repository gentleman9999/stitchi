import { gql, useQuery } from '@apollo/client'
import { Badge, Logo } from '@components/ui'
import { ClosetLayoutGetDataQuery } from '@generated/ClosetLayoutGetDataQuery'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'
import OrganizationDropdown from './OrganizationDropdown'
import {
  ArrowRightOnRectangleIcon,
  BoltIcon,
  ChevronUpDownIcon,
  Cog8ToothIcon,
  HomeIcon,
  PaintBrushIcon,
  QuestionMarkCircleIcon,
  RectangleStackIcon,
  SwatchIcon,
  TruckIcon,
} from '@heroicons/react/20/solid'
import UserAvatar from '@components/common/UserAvatar'
import Skeleton from 'react-loading-skeleton'
import { capitalize } from 'lodash-es'
import { useAuthorizedComponent } from '@lib/auth'
import { ScopeAction, ScopeResource } from '@generated/globalTypes'

interface Props {
  children: React.ReactNode
}

const ClosetLayout = (props: Props) => {
  const { can, loading: authorizationLoading } = useAuthorizedComponent()
  const { data, loading } = useQuery<ClosetLayoutGetDataQuery>(GET_DATA)

  const { user, humanizedRole: role, organization } = data?.viewer || {}

  return (
    <div className="flex">
      <nav className="fixed h-screen border-r bg-paper w-64">
        <div className="relative flex flex-col p-2 gap-2 h-full">
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
            <ul className="flex flex-col">
              {[
                {
                  href: routes.internal.closet.href(),
                  label: 'Closet',
                  icon: <HomeIcon className="w-4 h-4" />,
                },
                {
                  href: routes.internal.closet.designs.href(),
                  label: 'Designs',
                  icon: <PaintBrushIcon className="w-4 h-4" />,
                },
                {
                  href: routes.internal.closet.orders.href(),
                  label: 'Orders',
                  icon: <TruckIcon className="w-4 h-4" />,
                  hidden:
                    authorizationLoading ||
                    !can(ScopeResource.Order, ScopeAction.READ),
                },

                {
                  href: routes.internal.closet.brand.href(),
                  label: 'Brand Hub',
                  icon: <SwatchIcon className="w-4 h-4" />,
                },
                {
                  href: '',
                  label: 'Integrations',
                  icon: <BoltIcon className="w-4 h-4" />,
                  hidden:
                    authorizationLoading ||
                    !can(ScopeResource.Integration, ScopeAction.READ),
                },
              ]
                .filter(link => !link.hidden)
                .map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:bg-gray-50 rounded-md p-2 w-full text-sm font-medium flex items-center gap-2 text-gray-500"
                    >
                      <div className="w-5 h-5 inline-flex items-center justify-center">
                        {link.icon}
                      </div>
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
            <hr className="my-2" />
            <ul>
              {[
                {
                  href: '',
                  label: 'Settings',
                  icon: <Cog8ToothIcon className="w-4 h-4" />,
                },
                {
                  href: '',
                  label: 'Help',
                  icon: <QuestionMarkCircleIcon className="w-4 h-4" />,
                },

                {
                  href: routes.internal.logout.href(),
                  label: 'Sign Out',
                  icon: <ArrowRightOnRectangleIcon className="w-4 h-4" />,
                },
              ].map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:bg-gray-50 rounded-md p-2 w-full text-sm font-medium flex items-center gap-2 text-gray-500"
                  >
                    <div className="w-5 h-5 inline-flex items-center justify-center">
                      {link.icon}
                    </div>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-2 border rounded-md p-4 text-sm flex flex-col gap-4 text-gray-600 bg-gray-50">
            <div>
              <Badge label="Beta" size="small" severity="info" />
            </div>
            Welcome to our beta. We&apos;re still working out the kinks, so
            please let us know if you have any feedback.
            <Link href="#" className="underline font-medium">
              Submit feedback
            </Link>
          </div>

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
                <div className="flex-1 flex justify-end">
                  <Badge label={capitalize(role || '')} size="small" />
                </div>
              </div>
            </div>

            <button className="hover:bg-gray-50 rounded-md p-2 w-full text-sm font-medium flex items-center gap-2 text-gray-500">
              <div className="w-5 h-5 inline-flex items-center justify-center">
                <RectangleStackIcon className="w-4 h-4" />
              </div>
              Invite members
            </button>
          </div>
        </div>
      </nav>
      <div className="ml-64 overflow-auto flex items-center w-full">
        {props.children}
      </div>
    </div>
  )
}

const GET_DATA = gql`
  query ClosetLayoutGetDataQuery {
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
        picture
        email
      }
    }
  }
`

export default ClosetLayout
