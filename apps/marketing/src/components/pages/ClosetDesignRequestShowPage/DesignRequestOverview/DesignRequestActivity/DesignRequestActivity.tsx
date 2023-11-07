import { gql, useQuery, useSubscription } from '@apollo/client'
import BlurredComponent from '@components/common/BlurredComponent'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import Alert from '@components/ui/Alert'
import { DesignRequestStatus } from '@generated/globalTypes'
import React from 'react'
import cx from 'classnames'
import DesignRequestHistory from './DesignRequestHistory'
import DesignRequestMessageInput from './DesignRequestMessageInput'
import {
  DesignRequestActivityActivitySubscription,
  DesignRequestActivityActivitySubscriptionVariables,
  DesignRequestActivityGetDataQuery,
  DesignRequestActivityGetDataQueryVariables,
} from '@generated/types'

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

  return (
    <div className="relative">
      {designRequest?.status === DesignRequestStatus.DRAFT ? (
        <BlurredComponent
          message={
            <Alert
              severity="info"
              description="Activity is only available for design requests that have been submitted. Once submitted, come back here to view updates to your design and request changes."
            />
          }
        />
      ) : null}

      <div>
        <div className="col-span-1 md:col-span-8">
          <ClosetSection>
            <ClosetSectionHeader>
              <ClosetSectionTitle title="Activity" />
            </ClosetSectionHeader>

            <div className="flex flex-col gap-8">
              {designRequest?.status === DesignRequestStatus.APPROVED ? (
                <Alert
                  severity="info"
                  description="This design request has been approved and modifications have been disabled. If you'd like to make a modification to this design request, please duplicate it and submit a new request."
                />
              ) : null}

              <div
                className={cx('flex flex-col gap-8', {
                  'pointer-events-none opacity-60':
                    designRequest?.status === DesignRequestStatus.APPROVED,
                })}
              >
                <DesignRequestHistory
                  loading={loading}
                  designRequest={designRequest}
                />

                <DesignRequestMessageInput
                  loading={loading}
                  designRequest={designRequest}
                  viewer={data?.viewer}
                />
              </div>
            </div>
          </ClosetSection>
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
  ${DesignRequestMessageInput.fragments.viewer}
  query DesignRequestActivityGetDataQuery($designRequestId: ID!) {
    viewer {
      id
      ...DesignRequestMessageInputViewerFragment
    }
    designRequest(id: $designRequestId) {
      id
      status
      ...DesignRequestHistoryDesignRequestFragment
      ...DesignRequestMessageInputDesignRequestFragment
    }
  }
`

export default DesignRequestActivity
