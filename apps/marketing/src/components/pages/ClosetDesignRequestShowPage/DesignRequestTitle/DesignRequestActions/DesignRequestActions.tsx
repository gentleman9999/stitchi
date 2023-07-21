import { gql } from '@apollo/client'
import ClosetPageActions, {
  ClosetPageActionType,
} from '@components/common/ClosetPageActions'
import { StandoutType, useStandout } from '@components/context'
import { DesignRequestActionsDesignRequestFragment } from '@generated/DesignRequestActionsDesignRequestFragment'
import {
  DesignRequestStatus,
  ScopeAction,
  ScopeResource,
} from '@generated/globalTypes'
import { useAuthorizedComponent } from '@lib/auth'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import React from 'react'
import useDesignRequestActions from './useDesignRequestActions'

interface Props {
  designRequest: DesignRequestActionsDesignRequestFragment
}

const DesignRequestActions = ({ designRequest }: Props) => {
  const { setStandout } = useStandout()

  const { handleSubmitDesignRequest, submitting } = useDesignRequestActions({
    designRequestId: designRequest.id,
  })

  const { can, loading } = useAuthorizedComponent()

  const actions: ClosetPageActionType[] = [
    {
      label: 'Share',
      onClick: () =>
        setStandout({
          type: StandoutType.ClosetLinkShare,
          absoluteUrl: makeAbsoluteUrl(
            routes.internal.closet.designRequests.show.href({
              designId: designRequest.id,
            }),
          ),
        }),
    },
    {
      label: 'Duplicate',
      onClick: () => {},
    },
    {
      label: 'Archive',
      onClick: () => {},
    },
  ]

  switch (designRequest.status) {
    case DesignRequestStatus.DRAFT: {
      actions.push({
        primary: true,
        label: 'Request design',
        loading: submitting,
        onClick: handleSubmitDesignRequest,
      })
    }

    case DesignRequestStatus.SUBMITTED:
    case DesignRequestStatus.AWAITING_APPROVAL:
    case DesignRequestStatus.AWAITING_REVISION: {
      if (!loading && can(ScopeResource.DesignProof, ScopeAction.CREATE)) {
        actions.push({
          primary: true,
          loading: false,
          label: 'Upload proof',
          href: routes.internal.closet.designRequests.show.proofs.create.href({
            designId: designRequest.id,
          }),
        })
      }
    }
  }

  return <ClosetPageActions actions={actions} />
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
