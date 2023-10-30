import NavigationGroup from '@components/layout/ClosetLayout/Navigation/NavigationGroup'
import NavItem from '@components/layout/NavItem'
import { ScopeAction, ScopeResource } from '@generated/types'
import {
  Cog8ToothIcon,
  PaintBrushIcon,
  RectangleStackIcon,
} from '@heroicons/react/20/solid'
import { AuthorizedComponent } from '@lib/auth-rsc'
import { TOPBAR_NAV_HEIGTH_PX } from '@lib/constants'
import routes from '@lib/routes'
import React from 'react'

const availableHeight = `calc(100vh-${TOPBAR_NAV_HEIGTH_PX}px)`

interface Props {
  children: React.ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <div
      className={`min-h-[${availableHeight}] mt-[${TOPBAR_NAV_HEIGTH_PX}px] relative md:pl-64`}
    >
      <nav
        className={`fixed h-[${availableHeight}] left-0 top-[${TOPBAR_NAV_HEIGTH_PX}px] border-r bg-paper w-0 md:w-64 z-10 overflow-scroll flex flex-col`}
      >
        <NavigationGroup
          icon={<PaintBrushIcon className="w-4 h-4" />}
          label="Design"
          defaultExpanded={true}
        >
          <NavItem
            label="Designs"
            href={routes.internal.closet.designs.href()}
          />

          <NavItem
            label="Brand Kit"
            href={routes.internal.closet.brand.href()}
          />
        </NavigationGroup>

        <AuthorizedComponent
          or={[
            {
              resource: ScopeResource.DesignProduct,
              action: ScopeAction.READ,
            },
            {
              resource: ScopeResource.Order,
              action: ScopeAction.READ,
            },
          ]}
        >
          <NavigationGroup
            label="Production"
            icon={<RectangleStackIcon className="w-4 h-4" />}
            defaultExpanded={true}
          >
            <AuthorizedComponent
              resource={ScopeResource.DesignProduct}
              action={ScopeAction.READ}
            >
              <NavItem
                label="Inventory"
                href={routes.internal.closet.inventory.href()}
              />
            </AuthorizedComponent>

            <AuthorizedComponent
              resource={ScopeResource.Order}
              action={ScopeAction.READ}
            >
              <NavItem
                label="Orders"
                href={routes.internal.closet.orders.href()}
              />
            </AuthorizedComponent>
          </NavigationGroup>
        </AuthorizedComponent>

        <hr />

        <NavItem
          label="Settings"
          href={routes.internal.closet.settings.general.href()}
          icon={<Cog8ToothIcon className="w-4 h-4" />}
        />
      </nav>

      <main
        className={`overflow-auto w-full z-0 bg-gray-50 min-h-[${availableHeight}] relative`}
      >
        {children}
      </main>
    </div>
  )
}

export default Layout
