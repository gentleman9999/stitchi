import React from 'react'
import { ClosetProvider } from './closet-context'
import { getUserAuthorization } from '@lib/auth-rsc'
import { MembershipRole, ScopeAction, ScopeResource } from '@generated/types'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetPageActions from '@components/common/ClosetPageActions'
import routes from '@lib/routes'
import ClosetDesignFilters from './ClosetDesignFilters'
import ClosetDesignTabs from './ClosetDesignTabs'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionHeaderTabs from '@components/common/ClosetSectionHeaderTabs'
import OnboardingActionPanelContainer from './OnboardingActionPanelContainer'

interface Props {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  const { role, membershipId, can } = await getUserAuthorization()

  const isArtist = role === MembershipRole.STITCHI_DESIGNER

  return (
    <ClosetProvider defaultArtistFilter={isArtist ? membershipId : null}>
      <ClosetPageContainer>
        <ClosetPageHeader>
          <ClosetPageTitle
            title="Design"
            actions={
              <ClosetPageActions
                actions={
                  can([
                    {
                      action: ScopeAction.CREATE,
                      resource: ScopeResource.DesignRequest,
                    },
                  ])
                    ? [
                        {
                          label: 'New Design',
                          href: routes.internal.closet.designs.create.href(),
                          primary: true,
                        },
                      ]
                    : []
                }
              />
            }
          />
        </ClosetPageHeader>

        <OnboardingActionPanelContainer />

        <ClosetDesignFilters />

        <ClosetDesignTabs>
          <ClosetSectionHeader>
            <ClosetSectionHeaderTabs />
          </ClosetSectionHeader>

          {children}
        </ClosetDesignTabs>
      </ClosetPageContainer>
    </ClosetProvider>
  )
}

export default Layout
