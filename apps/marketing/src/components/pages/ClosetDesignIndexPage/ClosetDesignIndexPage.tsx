'use client'

import { gql, useQuery } from '@apollo/client'
import ClosetPageActions from '@components/common/ClosetPageActions'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionHeaderTabs from '@components/common/ClosetSectionHeaderTabs'

import { ClosetDesignIndexPageGetDataQuery } from '@generated/ClosetDesignIndexPageGetDataQuery'
import {
  MembershipRole,
  ScopeAction,
  ScopeResource,
} from '@generated/globalTypes'
import { useAuthorizedComponent } from '@lib/auth'
import routes from '@lib/routes'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { ClosetProvider } from './closet-context'
import ClosetDesignFilters from './ClosetDesignFilters'
import OnboardingActionPanel from './OnboardingActionPanel'

const ClosetTabAll = dynamic(() => import('./ClosetTabAll'))
const ClosetTabApprovedDesigns = dynamic(
  () => import('./ClosetTabApprovedDesigns'),
)

const ClosetTabDesignRequests = dynamic(
  () => import('./ClosetTabDesignRequests'),
)

interface Props {}

const ClosetDesignIndexPage = ({}: Props) => {
  const searchParams = useSearchParams()!

  const query = Object.fromEntries(searchParams.entries())

  const { can } = useAuthorizedComponent()

  const { data } = useQuery<ClosetDesignIndexPageGetDataQuery>(GET_DATA)

  const { viewer } = data || {}

  const isArtist = viewer?.role === MembershipRole.STITCHI_DESIGNER

  return (
    <ClosetProvider defaultArtistFilter={isArtist ? viewer.id : null}>
      <ClosetPageContainer>
        <ClosetPageHeader>
          <ClosetPageTitle
            title="Design"
            actions={
              <ClosetPageActions
                actions={
                  can(ScopeResource.DesignRequest, ScopeAction.CREATE)
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

        <OnboardingActionPanel />

        <ClosetDesignFilters />

        <ClosetSection
          tabs={[
            {
              id: 'designs',
              label: 'All',
              href: routes.internal.closet.designs.href(query),
            },
            // {
            //   id: 'collections',
            //   label: 'Collections',
            //   href: routes.internal.closet.collections.href(router.query),
            // },

            {
              id: 'design-requests',
              label: 'In-Progress',
              href: routes.internal.closet.designs.inProgress.href(query),
            },
            {
              id: 'approved-designs',
              label: 'Approved',
              href: routes.internal.closet.designs.approved.href(query),
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

const GET_DATA = gql`
  query ClosetDesignIndexPageGetDataQuery {
    viewer {
      id
      role
    }
  }
`

export default ClosetDesignIndexPage
