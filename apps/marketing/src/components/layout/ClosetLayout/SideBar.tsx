import { useAuthorizedComponent } from '@lib/auth'
import React from 'react'
import OrganizationDropdown from './OrganizationDropdown'
import {
  ArrowRightOnRectangleIcon,
  ChevronUpDownIcon,
  Cog8ToothIcon,
  InboxIcon,
  PaintBrushIcon,
  QuestionMarkCircleIcon,
  RectangleStackIcon,
  SwatchIcon,
  TruckIcon,
} from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import { ScopeAction, ScopeResource } from '@generated/globalTypes'
import Link from 'next/link'
import { Badge, Logo } from '@components/ui'
import Skeleton from 'react-loading-skeleton'
import UserAvatar from '@components/common/UserAvatar'
import { gql } from '@apollo/client'
import cx from 'classnames'
import { SideBarMembershipFragment } from '@generated/SideBarMembershipFragment'
import { useRouter } from 'next/router'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  hidden?: boolean
  includedPaths?: string[]
}

interface Navigation {
  primary: NavItem[]
  secondary: NavItem[]
}

const getActiveNavItem = (navigation: Navigation): NavItem | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const { pathname } = window.location

  const navItems = [...navigation.primary, ...navigation.secondary]

  return (
    navItems.find(navItem => {
      return (
        navItem.includedPaths?.some(path => pathname.startsWith(path)) ||
        pathname.startsWith(navItem.href)
      )
    }) || null
  )
}

interface Props {
  loading: boolean
  membershp?: SideBarMembershipFragment | null
  logoutOnly?: boolean
}

const SideBar = ({ membershp, loading, logoutOnly }: Props) => {
  const router = useRouter()
  const [upcomingNavItem, setUpcomingNavItem] = React.useState<NavItem | null>(
    null,
  )

  const { can, loading: authorizationLoading } = useAuthorizedComponent()

  React.useEffect(() => {
    const handleRouteChange = () => {
      setUpcomingNavItem(null)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  const { user, organization } = membershp || {}

  const navigation: Navigation = logoutOnly
    ? {
        primary: [],
        secondary: [
          {
            href: routes.internal.logout.href(),
            label: 'Sign Out',
            icon: <ArrowRightOnRectangleIcon className="w-4 h-4" />,
          },
        ],
      }
    : {
        primary: [
          // {
          //   href: routes.internal.closet.href(),
          //   label: 'Closet',
          //   icon: <HomeIcon className="w-4 h-4" />,
          // },
          {
            href: routes.internal.closet.inbox.href(),
            label: 'Inbox',
            icon: <InboxIcon className="w-4 h-4" />,
            includedPaths: [],
          },
          {
            href: routes.internal.closet.designs.href(),
            label: 'Design',
            icon: <PaintBrushIcon className="w-4 h-4" />,
            includedPaths: [
              routes.internal.closet.collections.href(),
              routes.internal.closet.designRequests.href(),
              routes.internal.closet.designProducts.href(),
            ],
          },
          {
            href: routes.internal.closet.orders.href(),
            label: 'Fulfill',
            icon: <TruckIcon className="w-4 h-4" />,
            hidden:
              authorizationLoading ||
              !can(ScopeResource.Order, ScopeAction.READ),
            includedPaths: [routes.internal.closet.orders.href()],
          },

          {
            href: routes.internal.closet.brand.href(),
            label: 'Brand Hub',
            icon: <SwatchIcon className="w-4 h-4" />,
          },
        ],
        secondary: [
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
        ],
      }

  const activeNavItem = upcomingNavItem || getActiveNavItem(navigation)

  const handleNavItemClick = (navItem: NavItem) => {
    setUpcomingNavItem(navItem)
  }

  return (
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
          <ul className="flex flex-col gap-1">
            {navigation.primary
              .filter(link => !link.hidden)
              .map(link => (
                <li key={link.href}>
                  <NavItem
                    {...link}
                    active={activeNavItem?.href === link.href}
                    onClick={() => handleNavItemClick(link)}
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
                  onClick={() => handleNavItemClick(link)}
                />
              </li>
            ))}
          </ul>
        </div>

        {logoutOnly ? null : (
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
        )}

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
          can(ScopeResource.Membership, ScopeAction.CREATE) &&
          !logoutOnly ? (
            <button className="hover:bg-gray-50 rounded-md p-2 w-full text-sm font-medium flex items-center gap-2 text-gray-500">
              <div className="w-5 h-5 inline-flex items-center justify-center">
                <RectangleStackIcon className="w-4 h-4" />
              </div>
              Invite members
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  )
}

const NavItem = ({
  href,
  label,
  icon,
  active,
  onClick,
}: NavItem & { active?: boolean; onClick: () => void }) => (
  <Link
    onClick={onClick}
    href={href}
    className={cx(
      'hover:bg-gray-50 rounded-md p-2 w-full text-sm font-medium flex items-center gap-2 text-gray-500',
      {
        'bg-gray-50 border border-gray-200': active,
      },
    )}
  >
    <div className="w-5 h-5 inline-flex items-center justify-center">
      {icon}
    </div>
    {label}
  </Link>
)

SideBar.fragments = {
  membership: gql`
    fragment SideBarMembershipFragment on Membership {
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

export default SideBar
