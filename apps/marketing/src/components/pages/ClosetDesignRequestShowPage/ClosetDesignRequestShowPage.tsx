import React from 'react'
import { DesignProvider } from './design-context'
import {
  ClosetDesignRequestShowPageGetDataQuery,
  ClosetDesignRequestShowPageGetDataQueryVariables,
} from '@generated/ClosetDesignRequestShowPageGetDataQuery'
import { gql, useQuery } from '@apollo/client'
import DesignRequestTitle from './DesignRequestTitle'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionHeaderTabs from '@components/common/ClosetSectionHeaderTabs'
import ClosetSection from '@components/common/ClosetSection'
import routes from '@lib/routes'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import DesignRequestOverview from './DesignRequestOverview'

interface Props {
  designId: string
}

const ClosetDesignRequestShowPage = ({ designId }: Props) => {
  const { data, loading } = useQuery<
    ClosetDesignRequestShowPageGetDataQuery,
    ClosetDesignRequestShowPageGetDataQueryVariables
  >(GET_DATA, { variables: { designId }, fetchPolicy: 'cache-and-network' })

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
  query ClosetDesignRequestShowPageGetDataQuery($designId: ID!) {
    designRequest(id: $designId) {
      id
      ...DesignRequestTitleDesignRequesetFragment
    }
  }
`

export default ClosetDesignRequestShowPage
