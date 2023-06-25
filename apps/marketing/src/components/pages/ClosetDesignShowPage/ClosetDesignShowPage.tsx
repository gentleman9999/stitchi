import { Container } from '@components/ui'
import React from 'react'
import { DesignProvider } from './design-context'
import {
  ClosetDesignShowPageGetDataQuery,
  ClosetDesignShowPageGetDataQueryVariables,
} from '@generated/ClosetDesignShowPageGetDataQuery'
import { gql, useQuery } from '@apollo/client'
import DesignRequestTitle from './DesignRequestTitle'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionHeaderTabs from '@components/common/ClosetSectionHeaderTabs'
import ClosetSection from '@components/common/ClosetSection'
import routes from '@lib/routes'
import DesignRequestOverview from './DesignRequestOverview'
import DesignRequestActivity from './DesignRequestActivity'
import DesignProofs from './DesignProofs'

interface Props {
  designId: string
}

const ClosetDesignShowPage = ({ designId }: Props) => {
  const { data, loading } = useQuery<
    ClosetDesignShowPageGetDataQuery,
    ClosetDesignShowPageGetDataQueryVariables
  >(GET_DATA, { variables: { designId } })

  const { designRequest } = data || {}

  return (
    <DesignProvider>
      <Container>
        <ClosetPageHeader>
          <DesignRequestTitle loading={loading} designRequest={designRequest} />
        </ClosetPageHeader>

        <ClosetSection
          tabs={[
            {
              id: 'overview',
              href: routes.internal.closet.designs.show.href({
                designId: designId,
              }),
              label: 'Overview',
            },
            {
              id: 'activity',
              href: routes.internal.closet.designs.show.activity.href({
                designId: designId,
              }),
              label: 'Activity',
            },
            {
              id: 'proofs',
              href: routes.internal.closet.designs.show.proofs.href({
                designId: designId,
              }),
              label: 'Proofs',
            },
            // {
            //   id: 'order-history',
            //   href: '#',
            //   label: 'Order History',
            // },
          ]}
        >
          {({ activeTab }) => (
            <>
              <ClosetSectionHeader divider>
                <ClosetSectionHeaderTabs />
              </ClosetSectionHeader>

              {designRequest && activeTab ? (
                <>
                  {activeTab.id === 'overview' ? (
                    <DesignRequestOverview designRequest={designRequest} />
                  ) : null}

                  {activeTab.id === 'activity' ? (
                    <DesignRequestActivity designRequest={designRequest} />
                  ) : null}

                  {activeTab.id === 'proofs' ? (
                    <DesignProofs designRequest={designRequest} />
                  ) : null}
                </>
              ) : null}
            </>
          )}
        </ClosetSection>
      </Container>
    </DesignProvider>
  )
}

const GET_DATA = gql`
  ${DesignRequestTitle.fragments.designRequest}
  ${DesignRequestOverview.fragments.designRequest}
  ${DesignRequestActivity.fragments.designRequest}
  ${DesignProofs.fragments.designRequest}
  query ClosetDesignShowPageGetDataQuery($designId: ID!) {
    designRequest(id: $designId) {
      id
      name
      status
      description
      ...DesignRequestTitleDesignRequesetFragment
      ...DesignRequestOverviewDesignRequestFragment
      ...DesignRequestActivityDesignRequestFragment
      ...DesignProofDesignRequestFragment
    }
  }
`

export default ClosetDesignShowPage
