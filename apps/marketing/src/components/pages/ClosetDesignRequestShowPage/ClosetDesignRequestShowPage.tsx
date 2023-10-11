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
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import DesignRequestOverview from './DesignRequestOverview'
import DesignOnboardingDialog from './DesignOnboardingDialog'
import Progress from './Progress'

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
    <>
      <DesignOnboardingDialog />
      <DesignProvider>
        <ClosetPageContainer>
          <ClosetPageHeader>
            <DesignRequestTitle
              loading={loading}
              designRequest={designRequest}
            />
            <div className="border-y mt-4">
              <Progress loading={loading} status={designRequest?.status} />
            </div>
          </ClosetPageHeader>

          <ClosetSection>
            <ClosetSectionHeader />
            <div className="m-auto">
              <DesignRequestOverview designRequestId={designId} />
            </div>
          </ClosetSection>
        </ClosetPageContainer>
      </DesignProvider>
    </>
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
