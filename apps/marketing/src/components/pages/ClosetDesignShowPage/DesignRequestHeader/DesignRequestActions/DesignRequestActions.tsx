import { gql } from '@apollo/client'
import { ClosetPageTitleActions } from '@components/common/ClosetPageTitle'
import { DesignRequestActionsDesignRequestFragment } from '@generated/DesignRequestActionsDesignRequestFragment'
import { DesignRequestStatus } from '@generated/globalTypes'
import React from 'react'
import useDesignRequestActions from './useDesignRequestActions'

interface Props {
  designRequest: DesignRequestActionsDesignRequestFragment
}

const DesignRequestActions = ({ designRequest }: Props) => {
  const { handleSubmitDesignRequest, submitting } = useDesignRequestActions({
    designRequestId: designRequest.id,
  })

  switch (designRequest.status) {
    case DesignRequestStatus.DRAFT:
      return (
        <ClosetPageTitleActions
          actions={[
            {
              primary: true,
              label: 'Submit design request',
              loading: submitting,
              onClick: handleSubmitDesignRequest,
            },
          ]}
        />
      )

    case DesignRequestStatus.AWAITING_APPROVAL:
    case DesignRequestStatus.AWAITING_REVISION:
      return (
        <ClosetPageTitleActions
          actions={[
            {
              primary: true,
              label: 'Submit revision',
              loading: submitting,
              onClick: handleSubmitDesignRequest,
            },
          ]}
        />
      )
  }

  return null
}

DesignRequestActions.fragments = {
  designRequest: gql`
    fragment DesignRequestActionsDesignRequestFragment on DesignRequest {
      id
      status
    }
  `,
}

export default DesignRequestActions
