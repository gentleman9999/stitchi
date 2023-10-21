import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionHeaderTabs from '@components/common/ClosetSectionHeaderTabs'
import { ScopeAction, ScopeResource } from '@generated/globalTypes'
import { useAuthorizedComponent } from '@lib/auth'
import routes from '@lib/routes'
import { useRouter } from 'next/router'
import React from 'react'
import ClosetInventoryIndexPageInventoryList from './ClosetInventoryIndexPageInventoryList'

interface Props {}

const ClosetInventoryIndexPage = (props: Props) => {
  const { can, loading: authorizationLoading } = useAuthorizedComponent()

  const router = useRouter()

  return (
    <ClosetPageContainer>
      <ClosetPageHeader>
        <ClosetPageTitle title="Inventory" description="" />
      </ClosetPageHeader>

      <ClosetSection
        tabs={[
          {
            id: 'inventory',
            label: 'Inventory',
            href: routes.internal.closet.inventory.href(),
          },
          {
            id: 'orders',
            label: 'Orders',
            href: routes.internal.closet.orders.href(),
          },
          // ...(can(ScopeResource.Integration, ScopeAction.READ)
          //   ? [
          //       {
          //         id: 'integrations',
          //         label: 'Integrations',
          //         href: routes.internal.closet.integrations.href(),
          //       },
          //     ]
          //   : []),
        ]}
      >
        <ClosetSectionHeader>
          <ClosetSectionHeaderTabs />
        </ClosetSectionHeader>

        <ClosetInventoryIndexPageInventoryList />
      </ClosetSection>
    </ClosetPageContainer>
  )
}

export default ClosetInventoryIndexPage
