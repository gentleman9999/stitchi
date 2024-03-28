import { ScopeAction, ScopeResource } from '@generated/types'
import { AuthorizedComponent } from '@lib/auth-rsc'
import routes from '@lib/routes'
import React from 'react'
import InviteMemberButton from './InviteMemberButton'
import NavigationGroup from './NavigationGroup'
import {
  Cog8ToothIcon,
  HomeIcon,
  PaintBrushIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline'
import NavItem from '../../NavItem'
import CatalogNavItem from '../../../(catalog)/products/CatalogNavItem'
import SidenavWrapper from '../../SidenavWrapper'

interface Props {
  children: React.ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <SidenavWrapper
      navigation={
        <>
          <AuthorizedComponent
            resource={ScopeResource.DesignProof}
            action={ScopeAction.CREATE}
          >
            <NavItem
              label="Dashboard"
              href={routes.internal.closet.dashboard.href()}
              icon={<HomeIcon className="w-4 h-4" />}
            />
          </AuthorizedComponent>

          <CatalogNavItem />

          <NavigationGroup
            icon={<PaintBrushIcon className="w-4 h-4" />}
            label="Designs"
            paths={[
              routes.internal.closet.designs.href(),
              routes.internal.closet.brand.href(),
            ]}
          >
            <NavItem
              label="Design requests"
              href={routes.internal.closet.designs.href()}
            />

            <NavItem
              label="Brand kit"
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
              label="Inventory"
              icon={<RectangleStackIcon className="w-4 h-4" />}
              paths={[
                routes.internal.closet.inventory.href(),
                routes.internal.closet.orders.href(),
              ]}
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
                  label="Purchase orders"
                  href={routes.internal.closet.orders.href()}
                />
              </AuthorizedComponent>
            </NavigationGroup>
          </AuthorizedComponent>

          <hr className="my-2" />

          <NavItem
            label="Settings"
            href={routes.internal.closet.settings.general.href()}
            icon={<Cog8ToothIcon className="w-4 h-4" />}
          />

          <AuthorizedComponent
            resource={ScopeResource.Membership}
            action={ScopeAction.CREATE}
          >
            <div className="flex-1 flex flex-col justify-end">
              <hr className="my-2" />
              <InviteMemberButton />
            </div>
          </AuthorizedComponent>
        </>
      }
    >
      {children}
    </SidenavWrapper>
  )
}

export default Layout
