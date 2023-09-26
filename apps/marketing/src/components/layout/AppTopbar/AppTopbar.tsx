import { gql } from '@apollo/client'
import { AppTopbarUserMembershipFragment } from '@generated/AppTopbarUserMembershipFragment'
import routes from '@lib/routes'
import React from 'react'
import { Logo } from '../../ui'
import AppTopbarUser from './AppTopbarUser'
import NavItem from './NavItem'

interface Props {
  membership: AppTopbarMembershipFragment | null
  renderLogo?: () => React.ReactNode
}

const AppTopbar = ({ membership, renderLogo }: Props) => {
  return (
    <nav className="fixed top-0 py-2 bg-paper w-full z-10 border-b h-[56px]">
      <div className="px-4">
        <div className="grid grid-cols-3">
          <div className="col-span-1 flex items-center">
            {renderLogo ? renderLogo() : <Logo className="h-10" />}
          </div>
          <div className="col-span-1 flex items-center"></div>
          <div className="col-span-1 flex justify-end items-center gap-4">
            <div className="hidden sm:block">
              <NavItem href={routes.internal.catalog.href()} label="Catalog" />
            </div>
            <div className="w-1 border-l h-6" />
            <div>
              <NavItem
                href={routes.external.support.href()}
                label="Support"
                target="_blank"
              />
            </div>
            <div className="w-1 border-l h-6" />
            <div>
              <AppTopbarUser membership={membership} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

AppTopbar.fragments = {
  membership: gql`
    ${AppTopbarUser.fragments.membership}
    fragment AppTopbarMembershipFragment on Membership {
      id
      ...AppTopbarUserMembershipFragment
    }
  `,
}

export default AppTopbar
