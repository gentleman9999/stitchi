import NavigationGroup from '@components/layout/ClosetLayout/Navigation/NavigationGroup'
import NavItem from '@components/layout/NavItem'
import { ScopeAction, ScopeResource } from '@generated/types'
import {
  Cog8ToothIcon,
  PaintBrushIcon,
  RectangleStackIcon,
} from '@heroicons/react/20/solid'
import { AuthorizedComponent } from '@lib/auth-rsc'
import routes from '@lib/routes'
import React from 'react'
import InviteMemberButton from './InviteMemberButton'
import ClosetLayoutWrapper from '../ClosetLayoutWrapper'

interface Props {
  children: React.ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <ClosetLayoutWrapper
      navigation={
        <>
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
              label="Blanks Catalog"
              href={routes.internal.catalog.href()}
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
    </ClosetLayoutWrapper>
  )
}

export default Layout
