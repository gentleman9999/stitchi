import React from 'react'
import { RectangleStackIcon, ShoppingBagIcon } from '@heroicons/react/20/solid'
import { ScopeAction, ScopeResource } from '@generated/globalTypes'
import { gql } from '@apollo/client'
import NavItem from './NavItem'
import { useAuthorizedComponent } from '@lib/auth'
import { PrimarySideBarMembershipFragment } from '@generated/PrimarySideBarMembershipFragment'
import { useClosetLayoutContext } from '../closet-layout-context'
import { StandoutType, useStandout } from '@components/context'
import routes from '@lib/routes'

interface Props {
  membership?: PrimarySideBarMembershipFragment | null
}

const PrimarySideBar = ({ membership }: Props) => {
  const { can, loading: authorizationLoading } = useAuthorizedComponent()
  const { navigation, activeNavItem, handleNavigate } = useClosetLayoutContext()
  const { setStandout } = useStandout()

  return (
    <div className="relative flex-1 flex flex-col p-2 gap-2 ">
      <div className="z-0">
        <ul className="flex flex-col gap-1">
          {navigation.primary
            .filter(link => !link.hidden)
            .map(link => (
              <li key={link.href}>
                <NavItem
                  {...link}
                  active={activeNavItem?.href === link.href}
                  onClick={() => handleNavigate(link)}
                  indicator={
                    link.label === 'Inbox' &&
                    Boolean(membership?.unseenWebNotificationsCount)
                  }
                />
              </li>
            ))}
        </ul>
        <hr className="my-2 sm:hidden" />
        <div className="sm:hidden">
          <NavItem
            href={routes.internal.catalog.href()}
            label="Catalog"
            active={activeNavItem?.href === routes.internal.catalog.href()}
            icon={<ShoppingBagIcon className="w-4 h-4" />}
          />
        </div>

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
  )
}

PrimarySideBar.fragments = {
  membership: gql`
    fragment PrimarySideBarMembershipFragment on Membership {
      id
      unseenWebNotificationsCount
    }
  `,
}

export default PrimarySideBar
