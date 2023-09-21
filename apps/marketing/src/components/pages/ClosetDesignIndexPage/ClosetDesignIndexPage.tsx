import ClosetPageActions from '@components/common/ClosetPageActions'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionHeaderTabs from '@components/common/ClosetSectionHeaderTabs'
import routes from '@lib/routes'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'
import { ClosetProvider } from './closet-context'
import ClosetDesignFilters from './ClosetDesignFilters'

const ClosetTabAll = dynamic(() => import('./ClosetTabAll'))
const ClosetTabApprovedDesigns = dynamic(
  () => import('./ClosetTabApprovedDesigns'),
)

const ClosetTabDesignRequests = dynamic(
  () => import('./ClosetTabDesignRequests'),
)

// const ClosetTabCollections = dynamic(() => import('./ClosetTabCollections'))

interface Props {}

const ClosetDesignIndexPage = ({}: Props) => {
  const router = useRouter()

  return (
    <ClosetProvider>
      <ClosetPageContainer>
        <ClosetPageHeader>
          <ClosetPageTitle
            title="Design"
            actions={
              <ClosetPageActions
                actions={[
                  {
                    label: 'New Design',
                    href: routes.internal.closet.designRequests.create.href(),
                    primary: true,
                  },
                ]}
              />
            }
          />
        </ClosetPageHeader>

        <ClosetDesignFilters />

        <ClosetSection
          tabs={[
            {
              id: 'designs',
              label: 'All',
              href: routes.internal.closet.designs.href(router.query),
            },
            // {
            //   id: 'collections',
            //   label: 'Collections',
            //   href: routes.internal.closet.collections.href(router.query),
            // },

            {
              id: 'design-requests',
              label: 'In-Progress',
              href: routes.internal.closet.designRequests.href(router.query),
            },
            {
              id: 'approved-designs',
              label: 'Approved',
              href: routes.internal.closet.designProducts.href(router.query),
            },
          ]}
        >
          {({ activeTab }) => (
            <>
              <ClosetSectionHeader>
                <ClosetSectionHeaderTabs />
              </ClosetSectionHeader>

              {activeTab?.id === 'designs' ? <ClosetTabAll /> : null}

              {/* {activeTab?.id === 'collections' ? (
                <ClosetTabCollections />
              ) : null} */}

              {activeTab?.id === 'approved-designs' ? (
                <ClosetTabApprovedDesigns />
              ) : null}

              {activeTab?.id === 'design-requests' ? (
                <ClosetTabDesignRequests />
              ) : null}
            </>
          )}
        </ClosetSection>
      </ClosetPageContainer>
    </ClosetProvider>
  )
}

export default ClosetDesignIndexPage
