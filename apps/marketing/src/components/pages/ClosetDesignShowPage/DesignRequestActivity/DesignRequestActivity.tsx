import { gql } from '@apollo/client'
import BlurredComponent from '@components/common/BlurredComponent'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import Alert from '@components/ui/Alert'
import { DesignRequestActivityDesignRequestFragment } from '@generated/DesignRequestActivityDesignRequestFragment'
import React from 'react'
import DesignProofCard from '../DesignProofCard'
import DesignRequestHistory from './DesignRequestHistory'
import DesignRequestMessageInput from './DesignRequestMessageInput'

interface Props {
  designRequest: DesignRequestActivityDesignRequestFragment
}

const DesignRequestActivity = ({ designRequest }: Props) => {
  const latestProof = designRequest.latestProofs[0]

  return (
    <div className="relative">
      {designRequest.status === 'DRAFT' ? (
        <BlurredComponent
          message={
            <Alert
              severity="info"
              description="Activity is only available for design requests that have been submitted. Once submitted, come back here to view updates to your design and request changes."
            />
          }
        />
      ) : null}
      <ClosetSection>
        <ClosetSectionHeader>
          <ClosetSectionTitle title="Activity" />
        </ClosetSectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="col-span-1 md:col-span-8 flex flex-col gap-8">
            <DesignRequestMessageInput designRequest={designRequest} />
            <DesignRequestHistory designRequestId={designRequest.id} />
          </div>
          <div className="col-span-1 md:col-span-4 flex flex-col gap-8">
            <div className="sticky top-10">
              <h2 className="text-lg font-semibold leading-6 mb-2 text-center text-gray-700">
                Latest proof
              </h2>
              {latestProof ? (
                <DesignProofCard designProof={latestProof} />
              ) : (
                <p>Once a proof has been submitted it will appear hear.</p>
              )}
            </div>
          </div>
        </div>
      </ClosetSection>
    </div>
  )
}

DesignRequestActivity.fragments = {
  designRequest: gql`
    ${DesignRequestMessageInput.fragments.designRequest}
    ${DesignProofCard.fragments.designProof}
    fragment DesignRequestActivityDesignRequestFragment on DesignRequest {
      id
      status
      latestProofs: proofs(limit: 1) {
        id
        ...DesignProofCardDesignProofFragment
      }
      ...DesignRequestMessageInputDesignRequestFragment
    }
  `,
}

export default DesignRequestActivity
