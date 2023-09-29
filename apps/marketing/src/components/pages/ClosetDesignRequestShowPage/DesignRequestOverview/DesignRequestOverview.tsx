import { gql, useQuery } from '@apollo/client'
import ClosetSection from '@components/common/ClosetSection'
import React from 'react'
import DesignProofVariantPreview from './DesignProofVariantPreview'
import DesignProofList from './DesignProofsList'
import {
  DesignRequestOverviewGetDataQuery,
  DesignRequestOverviewGetDataQueryVariables,
} from '@generated/DesignRequestOverviewGetDataQuery'
import { InputGroup } from '@components/ui'
import DesignRequestActivity from './DesignRequestActivity'
import { Card, CardContent } from '@components/ui/Card'
import GeneralInformation from './GeneralInformation'
import DesignRequestOverviewProductList from './DesignRequestOverviewProductList'
import Progress from './Progress'
import DesignRequestDraft from './DesignRequestDraft'
import { ComponentErrorMessage } from '@components/common'
import Button from '@components/ui/ButtonV2/Button'
import CreateDesignSlideOver from './CreateDesignSlideOver'
import {
  DesignRequestStatus,
  ScopeAction,
  ScopeResource,
} from '@generated/globalTypes'
import { useAuthorizedComponent } from '@lib/auth'
import DesignRequestAssociatedProducts from './DesignRequestAssociatedProducts'

interface Props {
  designRequestId: string
}

const DesignRequestOverview = ({ designRequestId }: Props) => {
  const { can, loading: authorizationLoading } = useAuthorizedComponent()
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
          <ClosetSection>
            {designRequest?.designRequestProduct ? (
              <ClosetSection>
                <DesignRequestOverviewProductList
                  product={designRequest.designRequestProduct}
                />
              </ClosetSection>
            ) : null}

            <Card>
              <CardContent>
                <DesignProofList
                  designRequestId={designRequestId}
                  activeProofId={activeProofId}
                  onClick={handleActiveProofChange}
                />

                {activeProofId &&
                designRequest?.status !== DesignRequestStatus.APPROVED &&
                !authorizationLoading &&
                can(ScopeResource.DesignProduct, ScopeAction.CREATE) ? (
                  <>
                    <br />
                    <InputGroup>
                      <Button
                        className="w-full"
                        color="brandPrimary"
                        size="lg"
                        onClick={() =>
                          setProofToApproveId(activeProofId || null)
                        }
                        loading={switchingProof}
                      >
                        Approve selected proof for production
                      </Button>
                    </InputGroup>
                  </>
                ) : null}
              </CardContent>
            </Card>
          </ClosetSection>

          <ClosetSection>
            <Progress loading={loading} status={designRequest?.status} />
          </ClosetSection>

          {designRequest && designRequest.status !== 'DRAFT' ? (
            <ClosetSection>
              <GeneralInformation designRequest={designRequest} />
            </ClosetSection>
          ) : null}
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
      ...DesignRequestDraftDesignRequestFragments
      ...DesignRequestSubmittedDesignRequestGeneralInformationFragment
      ...CreateDesignSlideOverDesignRequestFragment
    }
  }
`

export default DesignRequestOverview
