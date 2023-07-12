import { gql, useQuery } from '@apollo/client'
import React from 'react'
import Progress from './Progress'
import DesignRequestDraft from './DesignRequestDraft'
import DesignRequestOverviewProductList from './DesignRequestOverviewProductList'
import {
  DesignRequestOverviewGetDataQuery,
  DesignRequestOverviewGetDataQueryVariables,
} from '@generated/DesignRequestOverviewGetDataQuery'
import { ComponentErrorMessage } from '@components/common'
import { LoadingDots } from '@components/ui'
import GeneralInformation from './GeneralInformation'
import ClosetSection from '@components/common/ClosetSection'
import { Card, CardContent } from '@components/ui/Card'
import DesignRequestActivity from './DesignRequestActivity'
import DesignRequestFeaturedProof from './DesignRequestFeaturedProof'

interface Props {
  designRequestId: string
}

const DesignRequestOverview = ({ designRequestId }: Props) => {
  const { data, error, loading } = useQuery<
    DesignRequestOverviewGetDataQuery,
    DesignRequestOverviewGetDataQueryVariables
  >(GET_DATA, {
    variables: { designRequestId },
  })

  const { designRequest } = data || {}

  const designRequestProducts = designRequest?.designRequestProducts || []

  if (error) {
    return <ComponentErrorMessage error={error} />
  }

  return (
    <div className="grid grid-cols-12 gap-12">
      <div className="col-span-12 md:col-span-8">
        <DesignRequestFeaturedProof designRequestId={designRequestId} />

        {designRequest?.status === 'DRAFT' ? (
          <ClosetSection>
            <DesignRequestDraft designRequest={designRequest} />
          </ClosetSection>
        ) : null}

        {designRequest && designRequest.status !== 'DRAFT' ? (
          <ClosetSection>
            <DesignRequestActivity designRequestId={designRequest.id} />
          </ClosetSection>
        ) : null}

        {loading ? (
          <div className="flex justify-center items-center h-20">
            <LoadingDots />
          </div>
        ) : null}
      </div>

      <div className="col-span-12 md:col-span-4 flex flex-col">
        <ClosetSection>
          <Progress loading={loading} status={designRequest?.status} />
        </ClosetSection>

        {designRequest && designRequest.status !== 'DRAFT' ? (
          <ClosetSection>
            <GeneralInformation designRequest={designRequest} />
          </ClosetSection>
        ) : null}

        {designRequestProducts.length ? (
          <ClosetSection>
            <DesignRequestOverviewProductList
              products={designRequestProducts}
            />
          </ClosetSection>
        ) : null}
      </div>
    </div>
  )
}

const GET_DATA = gql`
  ${GeneralInformation.fragments.designRequest}
  ${DesignRequestOverviewProductList.fragments.designRequestProduct}
  ${DesignRequestDraft.fragments.designRequest}
  query DesignRequestOverviewGetDataQuery($designRequestId: ID!) {
    designRequest(id: $designRequestId) {
      id
      status
      designRequestProducts {
        id
        ...DesignRequestOverviewProductListDesignRequestProductFragment
      }
      ...DesignRequestDraftDesignRequestFragments
      ...DesignRequestSubmittedDesignRequestGeneralInformationFragment
    }
  }
`

export default DesignRequestOverview
