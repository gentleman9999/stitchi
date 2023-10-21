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
import DesignRequestDraft from './DesignRequestDraft'
import { ComponentErrorMessage } from '@components/common'
import CreateDesignSlideOver from './CreateDesignSlideOver'
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
  const [proofToApproveId, setProofToApproveId] = React.useState<string | null>(
    null,
  )

  const [switchingProof, setSwitchingProof] = React.useState<boolean>(false)

  const { data, loading, error } = useQuery<
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

  return (
    <div className="relative">
      {designRequest ? (
        <CreateDesignSlideOver
          designProofId={proofToApproveId}
          designRequest={designRequest}
          onClose={() => setProofToApproveId(null)}
        />
      ) : null}

      <ComponentErrorMessage error={error} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <DesignRequestAssociatedProducts designRequestId={designRequestId} />

        <div className="col-span-1 md:col-span-8">
          {activeProofId ? (
            <ClosetSection>
              <DesignProofVariantPreview designProofId={activeProofId} />
            </ClosetSection>
          ) : null}

          {designRequest && designRequest.status !== 'DRAFT' ? (
            <ClosetSection>
              <DesignRequestActivity designRequestId={designRequest.id} />
            </ClosetSection>
          ) : null}

          {designRequest?.status === 'DRAFT' ? (
            <ClosetSection>
              <DesignRequestDraft designRequest={designRequest} />
            </ClosetSection>
          ) : null}
        </div>

        <div className="col-span-1 md:col-span-4">
          {designRequest &&
          can(ScopeResource.DesignProof, ScopeAction.CREATE) ? (
            <ClosetSection>
              <DesignRequestCustomerCard designRequestId={designRequest.id} />
            </ClosetSection>
          ) : null}

          <DesignProofList
            designRequestId={designRequestId}
            activeProofId={activeProofId}
            onClick={handleActiveProofChange}
            onApprove={setProofToApproveId}
            loading={switchingProof}
          />

          {designRequest?.designRequestProduct ? (
            <ClosetSection>
              <DesignRequestOverviewProductList
                product={designRequest.designRequestProduct}
              />
            </ClosetSection>
          ) : null}

          {designRequest && designRequest.status !== 'DRAFT' ? (
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
  ${DesignRequestDraft.fragments.designRequest}
  ${CreateDesignSlideOver.fragments.designRequest}
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
      ...DesignRequestDraftDesignRequestFragments
      ...DesignRequestSubmittedDesignRequestGeneralInformationFragment
      ...CreateDesignSlideOverDesignRequestFragment
    }
  }
`

export default DesignRequestOverview
