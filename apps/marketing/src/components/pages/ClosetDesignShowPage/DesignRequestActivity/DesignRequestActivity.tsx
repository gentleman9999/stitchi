import { gql, useQuery, useSubscription } from '@apollo/client'
import BlurredComponent from '@components/common/BlurredComponent'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import Alert from '@components/ui/Alert'
import {
  DesignRequestActivityActivitySubscription,
  DesignRequestActivityActivitySubscriptionVariables,
} from '@generated/DesignRequestActivityActivitySubscription'
import {
  DesignRequestActivityGetDataQuery,
  DesignRequestActivityGetDataQueryVariables,
} from '@generated/DesignRequestActivityGetDataQuery'
import React from 'react'
import DesignProofCard from '../DesignProofCard'
import DesignRequestHistory from './DesignRequestHistory'
import DesignRequestMessageInput from './DesignRequestMessageInput'

interface Props {
  designRequestId: string
}

const DesignRequestActivity = ({ designRequestId }: Props) => {
  useSubscription<
    DesignRequestActivityActivitySubscription,
    DesignRequestActivityActivitySubscriptionVariables
  >(ACTIVITY_SUBSCRIPTION, {
    variables: { designRequestId },
    onData: ({ client: { cache }, data: { data } }) => {
      const success = Boolean(
        data?.designRequestHistoryItemAdded?.historyItemAdded,
      )

      if (success) {
        cache.evict({
          fieldName: 'history',
          id: cache.identify({ ...designRequest }),
        })
        cache.gc()
      }
    },
  })

  const { data, loading } = useQuery<
    DesignRequestActivityGetDataQuery,
    DesignRequestActivityGetDataQueryVariables
  >(GET_DATA, {
    variables: { designRequestId },
  })

  const { designRequest } = data || {}

  const latestProof = designRequest?.latestProofs[0]

  return (
    <div className="relative">
      {designRequest?.status === 'DRAFT' ? (
        <BlurredComponent
          message={
            <Alert
              severity="info"
              description="Activity is only available for design requests that have been submitted. Once submitted, come back here to view updates to your design and request changes."
            />
          }
        />
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="col-span-1 md:col-span-8">
          <ClosetSection>
            <ClosetSectionHeader>
              <ClosetSectionTitle title="Activity" />
            </ClosetSectionHeader>

            <div className="flex flex-col gap-8">
              <DesignRequestMessageInput
                loading={loading}
                designRequest={designRequest}
              />
              <DesignRequestHistory
                loading={loading}
                designRequest={designRequest}
              />
            </div>
          </ClosetSection>
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
    </div>
  )
}

const ACTIVITY_SUBSCRIPTION = gql`
  subscription DesignRequestActivityActivitySubscription(
    $designRequestId: ID!
  ) {
    designRequestHistoryItemAdded(designRequestId: $designRequestId) {
      historyItemAdded
    }
  }
`

const GET_DATA = gql`
  ${DesignRequestHistory.fragments.designRequest}
  ${DesignRequestMessageInput.fragments.designRequest}
  ${DesignProofCard.fragments.designProof}
  query DesignRequestActivityGetDataQuery($designRequestId: ID!) {
    designRequest(id: $designRequestId) {
      id
      status
      latestProofs: proofs(limit: 1) {
        id
        ...DesignProofCardDesignProofFragment
      }
      ...DesignRequestHistoryDesignRequestFragment
      ...DesignRequestMessageInputDesignRequestFragment
    }
  }
`

export default DesignRequestActivity
