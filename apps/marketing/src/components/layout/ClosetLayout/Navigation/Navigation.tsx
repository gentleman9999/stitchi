import { StandoutType, useStandout } from '@components/context'
import {
  MembershipRole,
  ScopeAction,
  ScopeResource,
} from '@generated/globalTypes'
import {
  Cog8ToothIcon,
  HomeIcon,
  InboxIcon,
  PaintBrushIcon,
  RectangleStackIcon,
} from '@heroicons/react/20/solid'
import { useAuthorizedComponent } from '@lib/auth'
import routes from '@lib/routes'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React from 'react'
import NavigationGroup from './NavigationGroup'
import SecondarySideBar from './SecondarySideBar'
import { gql } from '@apollo/client'
import { ClosetLayoutNavigationMembershipFragment } from '@generated/ClosetLayoutNavigationMembershipFragment'
import NavItem from '@components/layout/NavItem'

interface NavItemT {
  label: string
  href: string
  icon: React.ReactNode | null
  indicator?: boolean
  hidden?: boolean
}

interface NavGroup {
  label: string
  icon: React.ReactNode
  children: NavItemT[]
  defaultExpanded?: boolean
}

interface Props {
  membership?: ClosetLayoutNavigationMembershipFragment | null
}

const Navigation = ({ membership }: Props) => {
  const { asPath } = useRouter()
  const { can, loading: authorizationLoading, role } = useAuthorizedComponent()
  const { setStandout } = useStandout()

  const displaySettings = React.useMemo(
    () => asPath.includes('/closet/settings'),
    [asPath],
  )

  const navItems: (NavGroup | NavItemT)[] = React.useMemo(() => {
    return [
      {
        label: 'Activity',
        href: routes.internal.closet.inbox.href(),
        icon: <InboxIcon className="w-4 h-4" />,
        indicator: Boolean(membership?.unseenWebNotificationsCount),
      },
      {
        label: 'Dashboard',
        href: routes.internal.closet.dashboard.href(),
        icon: <HomeIcon className="w-4 h-4" />,
        hidden:
          !role ||
          ![
            MembershipRole.STITCHI_ADMIN,
            MembershipRole.STITCHI_DESIGNER,
          ].includes(role),
      },
      {
        label: 'Design',
        icon: <PaintBrushIcon className="w-4 h-4" />,
        children: [
          {
            label: 'Designs',
            href: routes.internal.closet.designs.href(),
            icon: null,
          },
          {
            label: 'Brand Kit',
            href: routes.internal.closet.brand.href(),
            icon: null,
          },
        ],
      },
      {
        label: 'Production',
        icon: <RectangleStackIcon className="w-4 h-4" />,
        children: [
          {
            label: 'Inventory',
            href: routes.internal.closet.inventory.href(),
            icon: null,
            hidden:
              authorizationLoading ||
              !can(ScopeResource.DesignProduct, ScopeAction.READ),
          },
          {
            label: 'Orders',
            href: routes.internal.closet.orders.href(),
            icon: null,
            hidden:
              authorizationLoading ||
              !can(ScopeResource.Order, ScopeAction.READ),
          },
        ],
      },
    ]
  }, [authorizationLoading, can, membership?.unseenWebNotificationsCount, role])

  return (
    <AnimatePresence initial={false}>
      {displaySettings ? (
        <motion.div
          transition={{
            type: 'tween',
            ease: 'linear',
            duration: 0.1,
          }}
          initial={{
            x: '-100%',
          }}
          animate={{
            x: '0%',
          }}
          exit={{
            x: '-100%',
          }}
        >
          <SecondarySideBar />
        </motion.div>
      ) : (
        <div className="relative flex-1 flex flex-col p-2 gap-2 ">
          <div className="z-0">
            <ul className="flex flex-col gap-1">
              {navItems.map(item =>
                'children' in item ? (
                  <NavigationGroup
                    key={item.label}
                    label={item.label}
                    icon={item.icon}
                    defaultExpanded={true}
                  >
                    {item.children.map(child => (
                      <NavItem key={child.label} {...child} />
                    ))}
                  </NavigationGroup>
                ) : (
                  <NavItem key={item.label} {...item} />
                ),
              )}
            </ul>

            <hr className="my-2" />

            <ul className="flex flex-col gap-1">
              <NavItem
                label="Settings"
                href={routes.internal.closet.settings.general.href()}
                icon={<Cog8ToothIcon className="w-4 h-4" />}
              />
            </ul>
          </div>

          <div className="flex-1 flex flex-col justify-end">
            {!authorizationLoading &&
              can(ScopeResource.Membership, ScopeAction.CREATE) && (
                <>
                  <hr className="my-2" />
                  <button
                    className="hover:bg-gray-50 rounded-md p-2 w-full text-sm font-medium flex items-center gap-2 text-gray-500"
                    onClick={() =>
                      setStandout({
                        type: StandoutType.UserInvite,
                      })
                    }
                  >
                    <div className="w-5 h-5 inline-flex items-center justify-center">
                      <RectangleStackIcon className="w-4 h-4" />
                    </div>
                    Invite members
                  </button>
                </>
              )}
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

Navigation.fragments = {
  membership: gql`
    fragment ClosetLayoutNavigationMembershipFragment on Membership {
      id
      unseenWebNotificationsCount
    }
  `,
}

export default Navigation
