import { gql, useQuery } from '@apollo/client'
import BlurredComponent from '@components/common/BlurredComponent'
import ClosetSection from '@components/common/ClosetSection'
import Alert from '@components/ui/Alert'
import React from 'react'
import DesignProofVariantPreview from './DesignProofVariantPreview'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import DesignProofList from './DesignProofsList'
import {
  DesignProofGetDataQuery,
  DesignProofGetDataQueryVariables,
} from '@generated/DesignProofGetDataQuery'
import ColorSwatch from '@components/common/ColorSwatch'

interface Props {
  designRequestId: string
}

const DesignProofs = ({ designRequestId }: Props) => {
  const [activeColorId, setActiveColorId] = React.useState<string | null>(null)
  const [activeProofId, setActiveProofId] = React.useState<string | null>(null)

  const { data } = useQuery<
    DesignProofGetDataQuery,
    DesignProofGetDataQueryVariables
  >(GET_DATA, {
    variables: { designRequestId },
  })

  const { designRequest } = data || {}

  React.useEffect(() => {
    if (!activeProofId && designRequest?.proofs.length) {
      setActiveProofId(designRequest?.proofs[0].id)
    }
  }, [activeProofId, designRequest?.proofs])

  React.useEffect(() => {
    if (!activeColorId && designRequest?.designRequestProduct?.colors.length) {
      setActiveColorId(
        designRequest?.designRequestProduct?.colors[0].catalogProductColorId,
      )
    }
  }, [activeColorId, designRequest?.designRequestProduct?.colors])

  return (
    <>
      <div className="relative">
        {designRequest?.status === 'DRAFT' ? (
          <BlurredComponent
            message={
              <Alert
                severity="info"
                description="Proofs are only available for design requests that have been submitted. Once submitted, come back here to view your design proofs."
              />
            }
          />
        ) : designRequest?.proofs.length === 0 ? (
          <BlurredComponent
            message={
              <Alert
                severity="info"
                description="Check back here soon for your design proofs."
              />
            }
          />
        ) : null}

        <div className="flex gap-12">
          <div className="flex-1">
            {activeProofId ? (
              <DesignProofVariantPreview
                designProofId={activeProofId}
                activeColorId={activeColorId}
              />
            ) : null}
          </div>

          <div className="w-[280px]">
            <ClosetSection>
              <ClosetSectionHeader>
                <ClosetSectionTitle title="Colors" />
              </ClosetSectionHeader>

              <ul className="flex items-center justify-center mt-4 gap-1">
                {designRequest?.designRequestProduct?.colors?.map(color => (
                  <ColorSwatch
                    key={color.catalogProductColorId}
                    hexCode={color.hexCode || ''}
                    label={color.name || ''}
                    selected={activeColorId === color.catalogProductColorId}
                    onClick={() =>
                      setActiveColorId(color.catalogProductColorId)
                    }
                  />
                ))}
              </ul>
            </ClosetSection>

            <ClosetSection>
              <ClosetSectionHeader>
                <ClosetSectionTitle title="Proofs" />
              </ClosetSectionHeader>

              <DesignProofList
                designRequestId={designRequestId}
                activeProofId={activeProofId}
                onClick={proofId => setActiveProofId(proofId)}
              />
            </ClosetSection>
          </div>
        </div>
      </div>
    </>
  )
}

const GET_DATA = gql`
  query DesignProofGetDataQuery($designRequestId: ID!) {
    designRequest(id: $designRequestId) {
      id
      status
      proofs {
        id
      }
      designRequestProduct {
        colors {
          catalogProductColorId
          name
          hexCode
        }
      }
    }
  }
`

export default DesignProofs
