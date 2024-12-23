'use client'

import { gql, useQuery } from '@apollo/client'
import ClosetSection from '@components/common/ClosetSection'
import React from 'react'
import DesignProofVariantPreview from './DesignProofVariantPreview'
import DesignProofList from './DesignProofsList'
import {
  DesignRequestOverviewGetDataQuery,
  DesignRequestOverviewGetDataQueryVariables,
} from '@generated/DesignRequestOverviewGetDataQuery'
import DesignRequestActivity from './DesignRequestActivity'
import GeneralInformation from './GeneralInformation'
import DesignRequestOverviewProductList from './DesignRequestOverviewProductList'
import { ComponentErrorMessage } from '@components/common'
import { ScopeAction, ScopeResource } from '@generated/globalTypes'
import { useAuthorizedComponent } from '@lib/auth'
import DesignRequestAssociatedProducts from './DesignRequestAssociatedProducts'
import DesignRequestCustomerCard from './DesignRequestCustomerCard'
import DesignRequestOrderList from './DesignRequestOrderList'

interface Props {
  designRequestId: string
}

const DesignRequestOverview = ({ designRequestId }: Props) => {
  const { can } = useAuthorizedComponent()
  const [activeProofId, setActiveProofId] = React.useState<string | null>(null)

  const [switchingProof, setSwitchingProof] = React.useState<boolean>(false)

  const { data, error } = useQuery<
    DesignRequestOverviewGetDataQuery,
    DesignRequestOverviewGetDataQueryVariables
  >(GET_DATA, {
    variables: { designRequestId },
  })

  const { designRequest } = data || {}

  React.useEffect(() => {
    if (!activeProofId && designRequest?.proofs.length) {
      setActiveProofId(designRequest?.proofs[0].id)
    }
  }, [activeProofId, designRequest?.proofs])

  const handleActiveProofChange = (proofId: string) => {
    if (activeProofId === proofId) {
      return
    }

    setSwitchingProof(true)
    setActiveProofId(proofId)

    setTimeout(() => {
      setSwitchingProof(false)
    }, 500)
  }

  const ProofList = (
    <DesignProofList
      designRequestId={designRequestId}
      activeProofId={activeProofId}
      onClick={handleActiveProofChange}
      loading={switchingProof}
    />
  )

  return (
    <div className="relative @container">
      <ComponentErrorMessage error={error} />

      <div className="grid grid-cols-1 @3xl:grid-cols-12 gap-12">
        <div className="col-span-1 @3xl:col-span-12">
          <DesignRequestAssociatedProducts designRequestId={designRequestId} />
        </div>

        <div className="col-span-1 @3xl:col-span-8">
          <div className="@3xl:hidden">{ProofList}</div>

          {activeProofId ? (
            <ClosetSection>
              <DesignProofVariantPreview designProofId={activeProofId} />
            </ClosetSection>
          ) : null}

          {designRequest?.id ? (
            <ClosetSection>
              <DesignRequestActivity designRequestId={designRequest.id} />
            </ClosetSection>
          ) : null}
        </div>

        <div className="col-span-1 @3xl:col-span-4">
          {designRequest &&
          can(ScopeResource.DesignProof, ScopeAction.CREATE) ? (
            <ClosetSection>
              <DesignRequestCustomerCard designRequestId={designRequest.id} />
            </ClosetSection>
          ) : null}

          <div className="hidden @3xl:block">{ProofList}</div>

          {designRequest?.designRequestProduct ? (
            <ClosetSection>
              <DesignRequestOverviewProductList
                product={designRequest.designRequestProduct}
              />
            </ClosetSection>
          ) : null}

          {designRequest ? (
            <ClosetSection>
              <GeneralInformation designRequest={designRequest} />
            </ClosetSection>
          ) : null}
          <ClosetSection>
            <DesignRequestOrderList orders={designRequest?.orders || []} />
          </ClosetSection>
        </div>
      </div>
    </div>
  )
}

const GET_DATA = gql`
  ${GeneralInformation.fragments.designRequest}
  ${DesignRequestOverviewProductList.fragments.designRequestProduct}
  ${DesignRequestOrderList.fragments.order}
  query DesignRequestOverviewGetDataQuery($designRequestId: ID!) {
    designRequest(id: $designRequestId) {
      id
      status
      proofs {
        id
      }
      designRequestProduct {
        id
        ...DesignRequestOverviewProductListDesignRequestProductFragment
      }
      orders {
        id
        ...DesignRequestOrderListOrderFragment
      }
      ...DesignRequestSubmittedDesignRequestGeneralInformationFragment
    }
  }
`

export default DesignRequestOverview
