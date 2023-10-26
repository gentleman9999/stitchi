import { gql, useQuery } from '@apollo/client'
import ClosetPageActions from '@components/common/ClosetPageActions'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionHeaderTabs from '@components/common/ClosetSectionHeaderTabs'
import Button from '@components/ui/ButtonV2/Button'
import { ClosetDesignIndexPageGetDataQuery } from '@generated/ClosetDesignIndexPageGetDataQuery'
import {
  MembershipRole,
  ScopeAction,
  ScopeResource,
} from '@generated/globalTypes'
import { useAuthorizedComponent } from '@lib/auth'
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

        <ClosetSection>
          <div className="bg-paper border rounded-md p-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <h2 className="font-md">Welcome to your design hub</h2>
                <p className="text-gray-700 text-sm max-w-2xl">
                  Your designs are the creative blueprints for your products.
                  Here you&apos;ll work with a designer to bring your ideas to
                  life. Finished designs will be available in your inventory to
                  send around the world.
                </p>
              </div>

              <Button variant="ghost" size="xl">
                Got it
              </Button>
            </div>
          </div>
        </ClosetSection>

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
              href: routes.internal.closet.designs.inProgress.href(
                router.query,
              ),
            },
            {
              id: 'approved-designs',
              label: 'Approved',
              href: routes.internal.closet.designs.approved.href(router.query),
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
