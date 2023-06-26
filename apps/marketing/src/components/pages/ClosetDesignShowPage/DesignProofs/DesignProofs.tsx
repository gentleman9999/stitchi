import { gql } from '@apollo/client'
import BlurredComponent from '@components/common/BlurredComponent'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import { Badge } from '@components/ui'
import Alert from '@components/ui/Alert'
import { DesignProofDesignRequestFragment } from '@generated/DesignProofDesignRequestFragment'
import React from 'react'
import DesignProofCard from '../DesignProofCard'

interface Props {
  designRequest: DesignProofDesignRequestFragment
}

const DesignProofs = ({ designRequest }: Props) => {
  return (
    <div className="relative">
      {designRequest.status === 'DRAFT' ? (
        <BlurredComponent
          message={
            <Alert
              severity="info"
              description="Proofs are only available for design requests that have been submitted. Once submitted, come back here to view your design proofs."
            />
          }
        />
      ) : null}

      <ClosetSection>
        <ClosetSectionHeader>
          <ClosetSectionTitle title="Proofs" />
        </ClosetSectionHeader>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {designRequest.proofs.map((proof, index) => (
            <DesignProofCard
              designProof={proof}
              key={proof.id}
              badges={
                index === 0 ? <Badge label="Latest" severity="default" /> : null
              }
            />
          ))}
        </div>
      </ClosetSection>
    </div>
  )
}

DesignProofs.fragments = {
  designRequest: gql`
    ${DesignProofCard.fragments.designProof}
    fragment DesignProofDesignRequestFragment on DesignRequest {
      id
      status
      proofs {
        id
        ...DesignProofCardDesignProofFragment
      }
    }
  `,
}

export default DesignProofs
