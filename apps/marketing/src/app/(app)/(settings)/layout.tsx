import routes from '@lib/routes'
import React from 'react'
import {
  ArrowLeftIcon,
  PuzzlePieceIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/20/solid'
import Link from 'next/link'
import SidenavWrapper from '../SidenavWrapper'
import NavItem from '../NavItem'

interface Props {
  children: React.ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <SidenavWrapper
      navigation={
        <>
          <Link
            href={routes.internal.closet.href()}
            className="text-sm text-gray-700 font-medium"
          >
            <button className="border p-1 rounded-sm mr-4">
              <ArrowLeftIcon className="w-3 h-3" />
            </button>
            Settings
          </Link>

          <hr className="my-2" />

          <NavItem
            href={routes.internal.closet.settings.general.href()}
            label="General"
            icon={<UserCircleIcon className="w-4 h-4" />}
          />

          <NavItem
            href={routes.internal.closet.settings.organization.href()}
            label="Organization"
            icon={<PuzzlePieceIcon className="w-4 h-4" />}
          />

          <NavItem
            href={routes.internal.closet.settings.team.href()}
            label="Team members"
            icon={<UsersIcon className="w-4 h-4" />}
          />
        </>
      }
    >
      {children}
    </SidenavWrapper>
  )
}

export default Layout
