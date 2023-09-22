import { gql, useQuery } from '@apollo/client'
import ClosetPageActions from '@components/common/ClosetPageActions'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionHeaderTabs from '@components/common/ClosetSectionHeaderTabs'
import { StandoutType, useStandout } from '@components/context'
import {
  ClosetDesignShowPageGetDataQuery,
  ClosetDesignShowPageGetDataQueryVariables,
} from '@generated/ClosetDesignShowPageGetDataQuery'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import React from 'react'
import DesignInventory from './DesignInventory'
import DesignOverview from './DesignOverview'

interface Props {
  designId: string
}

const ClosetDesignShowPage = ({ designId }: Props) => {
  const { setStandout } = useStandout()

  const { data } = useQuery<
    ClosetDesignShowPageGetDataQuery,
    ClosetDesignShowPageGetDataQueryVariables
  >(GET_DATA, {
    variables: { designId },
  })

  const { designProduct: design } = data || {}

  return (
    <ClosetPageContainer>
      <ClosetPageHeader>
        <ClosetPageTitle
          title={design?.name}
          actions={
            <ClosetPageActions
              actions={[
                {
                  label: 'Share',
                  onClick: () =>
                    setStandout({
                      type: StandoutType.ClosetLinkShare,
                      absoluteUrl: makeAbsoluteUrl(
                        routes.internal.closet.inventory.show.href({
                          designId,
                        }),
                      ),
                    }),
                },
                // {
                //   label: 'Duplicate',
                //   onClick: () => {},
                // },
                // {
                //   label: 'Sell online',
                //   onClick: () => {},
                // },

                {
                  primary: true,
                  label: 'Place order',
                  href: routes.internal.closet.inventory.show.buy.href({
                    designId,
                  }),
                },
              ]}
            />
          }
        />
      </ClosetPageHeader>

      <ClosetSection
        tabs={[
          {
            id: 'overview',
            href: routes.internal.closet.inventory.show.href({
              designId: designId,
            }),
            label: 'Overview',
          },
          {
            id: 'inventory',
            href: routes.internal.closet.inventory.show.inventory.href({
              designId: designId,
            }),
            label: 'Inventory',
          },
          // {
          //   id: 'orders',
          //   href: '#',
          //   label: 'Orders',
          // },
        ]}
      >
        {({ activeTab }) => (
          <>
            <ClosetSectionHeader divider>
              <ClosetSectionHeaderTabs />
            </ClosetSectionHeader>

            {activeTab ? (
              <div className="max-w-6xl m-auto">
                {activeTab.id === 'overview' ? (
                  <DesignOverview designId={designId} />
                ) : null}

                {activeTab.id === 'inventory' ? (
                  <DesignInventory designId={designId} />
                ) : null}
              </div>
            ) : null}
          </>
        )}
      </ClosetSection>
    </ClosetPageContainer>
  )
}

const GET_DATA = gql`
  query ClosetDesignShowPageGetDataQuery($designId: ID!) {
    designProduct(id: $designId) {
      id
      name
    }
  }
`

export default ClosetDesignShowPage
