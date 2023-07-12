import { gql, useQuery } from '@apollo/client'
import BlurredComponent from '@components/common/BlurredComponent'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import { Badge } from '@components/ui'
import Alert from '@components/ui/Alert'
import {
  DesignProofsGetDataQuery,
  DesignProofsGetDataQueryVariables,
} from '@generated/DesignProofsGetDataQuery'
import routes from '@lib/routes'
import React from 'react'
import DesignProofCard from '../DesignProofCard'
import DesignProofPreview from './DesignProofPreview'

interface Props {
  designRequestId: string
  designProofId?: string
}

const DesignProofs = ({ designRequestId, designProofId }: Props) => {
  const { data } = useQuery<
    DesignProofsGetDataQuery,
    DesignProofsGetDataQueryVariables
  >(GET_DATA, {
    variables: { designRequestId },
  })

  const { designRequest } = data || {}

  return (
    <>
      {designProofId ? (
        <DesignProofPreview
          designProofId={designProofId}
          designRequestId={designRequestId}
        />
      ) : null}

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

        <ClosetSection>
          <ClosetSectionHeader>
            <ClosetSectionTitle title="Proofs" />
          </ClosetSectionHeader>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {designRequest?.proofs.map((proof, index) => (
              <DesignProofCard
                designProof={proof}
                key={proof.id}
                badges={
                  index === 0 ? (
                    <Badge label="Latest" severity="default" />
                  ) : null
                }
                href={routes.internal.closet.designs.show.proofs.show.href({
                  designId: designRequestId,
                  proofId: proof.id,
                })}
              />
            ))}
          </div>
        </ClosetSection>
      </div>
    </>
  )
}

const GET_DATA = gql`
  ${DesignProofCard.fragments.designProof}
  query DesignProofsGetDataQuery($designRequestId: ID!) {
    designRequest(id: $designRequestId) {
      id
      status
      proofs {
        id
        ...DesignProofCardDesignProofFragment
      }
    }
  }
`

export default DesignProofs
