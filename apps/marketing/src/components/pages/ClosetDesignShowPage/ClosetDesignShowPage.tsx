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
import DesignProofs from './DesignProofs'
import ClosetPageContainer from '@components/common/ClosetPageContainer'

interface Props {
  designId: string
  designProofId?: string
}

const ClosetDesignShowPage = ({ designId, designProofId }: Props) => {
  const { data, loading } = useQuery<
    ClosetDesignShowPageGetDataQuery,
    ClosetDesignShowPageGetDataQueryVariables
  >(GET_DATA, { variables: { designId } })

  const { designRequest } = data || {}

  return (
    <DesignProvider>
      <ClosetPageContainer>
        <ClosetPageHeader>
          <DesignRequestTitle loading={loading} designRequest={designRequest} />
        </ClosetPageHeader>

        <ClosetSection
          tabs={[
            {
              id: 'overview',
              href: routes.internal.closet.designRequests.show.href({
                designId: designId,
              }),
              label: 'Overview',
            },

            {
              id: 'proofs',
              href: routes.internal.closet.designRequests.show.proofs.href({
                designId: designId,
              }),
              label: 'Proofs',
            },
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
                    <DesignRequestOverview designRequestId={designId} />
                  ) : null}

                  {activeTab.id === 'proofs' ? (
                    <DesignProofs
                      designRequestId={designId}
                      designProofId={designProofId}
                    />
                  ) : null}
                </div>
              ) : null}
            </>
          )}
        </ClosetSection>
      </ClosetPageContainer>
    </DesignProvider>
  )
}

const GET_DATA = gql`
  ${DesignRequestTitle.fragments.designRequest}
  query ClosetDesignShowPageGetDataQuery($designId: ID!) {
    designRequest(id: $designId) {
      id
      ...DesignRequestTitleDesignRequesetFragment
    }
  }
`

export default ClosetDesignShowPage
