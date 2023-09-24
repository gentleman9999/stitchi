import React from 'react'
import {
  ArrowRightOnRectangleIcon,
  Cog8ToothIcon,
  InboxIcon,
  PaintBrushIcon,
  PuzzlePieceIcon,
  QuestionMarkCircleIcon,
  SwatchIcon,
  TruckIcon,
  UserCircleIcon,
  UsersIcon,
  HomeIcon,
} from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import { useAuthorizedComponent } from '@lib/auth'
import {
  MembershipRole,
  ScopeAction,
  ScopeResource,
} from '@generated/globalTypes'
import { useRouter } from 'next/router'

export interface SubNavItem {
  type: 'subnav'
  href: string
  label: string
  icon: React.ReactNode
  hidden?: boolean
  includedPaths?: string[]
  LinkComponent?: React.ElementType
  subNavItems?: NavItem[]
}

export interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  hidden?: boolean
  includedPaths?: string[]
  LinkComponent?: React.ElementType
  subNavItems?: SubNavItem[]
  external?: boolean
}

interface Navigation {
  primary: NavItem[]
  secondary: NavItem[]
}

interface State {
  loading: boolean
  navigation: Navigation
  activeNavItem: NavItem | SubNavItem | null
  handleNavigate: (navItem: NavItem | SubNavItem) => void
}

const ClosetLayoutContext = React.createContext<State | undefined>(undefined)

interface Props {
  children: React.ReactNode
}

const ClosetLayoutContextProvider = ({ children }: Props) => {
  const router = useRouter()
  const { can, loading: authorizationLoading, role } = useAuthorizedComponent()
  const [upcomingNavItem, setUpcomingNavItem] = React.useState<
    NavItem | SubNavItem | null
  >(null)

  React.useEffect(() => {
    const handleRouteChange = () => {
      setUpcomingNavItem(null)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  const navigation: Navigation = React.useMemo(
    () => ({
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
          href: routes.internal.closet.dashboard.href(),
          label: 'Dashboard',
          icon: <HomeIcon className="w-4 h-4" />,
          includedPaths: [],
          hidden:
            !role ||
            ![
              MembershipRole.STITCHI_ADMIN,
              MembershipRole.STITCHI_DESIGNER,
            ].includes(role),
        },
        {
          href: routes.internal.closet.designs.href(),
          label: 'Design',
          icon: <PaintBrushIcon className="w-4 h-4" />,
          includedPaths: [
            routes.internal.closet.collections.href(),
            routes.internal.closet.designs.href(),
          ],
        },
        {
          href: routes.internal.closet.inventory.href(),
          label: 'Fulfill',
          icon: <TruckIcon className="w-4 h-4" />,
          hidden:
            authorizationLoading ||
            !can(ScopeResource.DesignProduct, ScopeAction.READ),
          includedPaths: [routes.internal.closet.inventory.href()],
        },

        {
          href: routes.internal.closet.brand.href(),
          label: 'Brand Kit',
          icon: <SwatchIcon className="w-4 h-4" />,
          hidden:
            authorizationLoading ||
            !can(ScopeResource.Organization, ScopeAction.READ),
        },
      ],
      secondary: [
        {
          href: routes.internal.closet.settings.general.href(),
          label: 'Settings',
          icon: <Cog8ToothIcon className="w-4 h-4" />,
          subNavItems: [
            {
              type: 'subnav',
              href: routes.internal.closet.settings.general.href(),
              label: 'General',
              icon: <UserCircleIcon className="w-4 h-4" />,
            },
            {
              type: 'subnav',
              href: routes.internal.closet.settings.organization.href(),
              label: 'Organization',
              icon: <PuzzlePieceIcon className="w-4 h-4" />,
            },
            {
              type: 'subnav',
              href: routes.internal.closet.settings.team.href(),
              label: 'Team members',
              icon: <UsersIcon className="w-4 h-4" />,
            },
          ],
        },
        {
          href: routes.external.support.href(),
          label: 'Help',
          external: true,
          icon: <QuestionMarkCircleIcon className="w-4 h-4" />,
        },

        {
          href: routes.internal.logout.href(),
          label: 'Sign Out',
          icon: <ArrowRightOnRectangleIcon className="w-4 h-4" />,
          LinkComponent: 'a',
        },
      ],
    }),
    [authorizationLoading, can, role],
  )

  const handleNavigate = (navItem: NavItem | SubNavItem) => {
    setUpcomingNavItem(navItem)
  }

  const activeNavItem = upcomingNavItem || getActiveNavItem(navigation)

  const value = React.useMemo(() => {
    return {
      loading: authorizationLoading,
      navigation,
      handleNavigate,
      activeNavItem,
    }
  }, [activeNavItem, authorizationLoading, navigation])

  return (
    <ClosetLayoutContext.Provider value={value}>
      {children}
    </ClosetLayoutContext.Provider>
  )
}

const getActiveNavItem = (
  navigation: Navigation,
): NavItem | SubNavItem | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const { pathname } = window.location

  const navItems = [
    ...navigation.primary,
    ...navigation.secondary.filter(
      link => link.href !== routes.internal.closet.settings.general.href(),
    ),
    ...navigation.primary.flatMap(item => item.subNavItems || []),
    ...navigation.secondary.flatMap(item => item.subNavItems || []),
  ]

  return (
    navItems.find(navItem => {
      return (
        navItem.includedPaths?.some(path => pathname === path) ||
        pathname === navItem.href
      )
    }) || null
  )
}

const useClosetLayoutContext = () => {
  const context = React.useContext(ClosetLayoutContext)

  if (context === undefined) {
    throw new Error(
      'useClosetLayoutContext must be used within a ClosetLayoutContextProvider',
    )
  }

  return context
}

export { ClosetLayoutContextProvider, useClosetLayoutContext }
