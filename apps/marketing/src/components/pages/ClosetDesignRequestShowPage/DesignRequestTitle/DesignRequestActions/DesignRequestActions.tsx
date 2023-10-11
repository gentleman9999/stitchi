import { gql, useMutation } from '@apollo/client'
import ClosetPageActions, {
  ClosetPageActionType,
} from '@components/common/ClosetPageActions'
import { StandoutType, useStandout } from '@components/context'
import useConfirmAction from '@components/hooks/useConfirmAction'
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
import {
  UseDesignRequestActionsRejectDesignRequestMutation,
  UseDesignRequestActionsRejectDesignRequestMutationVariables,
} from '@generated/UseDesignRequestActionsRejectDesignRequestMutation'

interface Props {
  designRequest: DesignRequestActionsDesignRequestFragment
}

const DesignRequestActions = ({ designRequest }: Props) => {
  const { setStandout } = useStandout()

  const [rejectDesignRequest, { loading: rejectingDesignRequest }] =
    useMutation<
      UseDesignRequestActionsRejectDesignRequestMutation,
      UseDesignRequestActionsRejectDesignRequestMutationVariables
    >(REJECT_DESIGN_REQUEST, {
      update(cache, { data }) {
        const designRequest = data?.designRequestReject?.designRequest

        if (designRequest) {
          cache.evict({ id: cache.identify({ ...designRequest }) })
          cache.gc()
        }
      },
    })

  const { handleSubmitDesignRequest, submitting } = useDesignRequestActions({
    designRequestId: designRequest.id,
  })

  const { ConfirmDialog: ConfirmRejectDialog, confirm: confirmReject } =
    useConfirmAction(() => {
      rejectDesignRequest({
        variables: {
          input: {
            designRequestId: designRequest.id,
            message: '',
          },
        },
      })
    })

  const { can, loading } = useAuthorizedComponent()

  const actions: ClosetPageActionType[] = [
    {
      label: 'Share',
      onClick: () =>
        setStandout({
          type: StandoutType.ClosetLinkShare,
          absoluteUrl: makeAbsoluteUrl(
            routes.internal.closet.designs.show.href({
              designId: designRequest.id,
            }),
          ),
        }),
    },
    // {
    //   label: 'Duplicate',
    //   onClick: () => {},
    // },
    // {
    //   label: 'Archive',
    //   onClick: () => {},
    // },
  ]

  switch (designRequest.status) {
    case DesignRequestStatus.DRAFT: {
      if (!loading && can(ScopeResource.DesignRequest, ScopeAction.UPDATE)) {
        actions.push({
          primary: true,
          label: 'Request design',
          loading: submitting,
          onClick: handleSubmitDesignRequest,
        })
      }

      break
    }

    case DesignRequestStatus.SUBMITTED:
    case DesignRequestStatus.AWAITING_APPROVAL:
    case DesignRequestStatus.AWAITING_REVISION: {
      if (!loading && can(ScopeResource.DesignProof, ScopeAction.CREATE)) {
        actions.push({
          label: 'Manage request',
          actions: [
            {
              loading: rejectingDesignRequest,
              label: 'Reject request',
              onClick: () => confirmReject({}),
            },
          ],
        })
      }

      if (!loading && can(ScopeResource.DesignProof, ScopeAction.CREATE)) {
        actions.push({
          primary: true,
          loading: false,
          label: 'Upload proof',
          href: routes.internal.closet.designs.show.proofs.create.href({
            designId: designRequest.id,
          }),
        })
      }

      break
    }
  }

  return (
    <>
      <ConfirmRejectDialog
        renderTitle={() => 'Are you sure?'}
        cancelText="Cancel"
        confirmText="Reject"
        renderMessage={() => (
          <div>Please be sure to write a message to the customer</div>
        )}
      />
      <ClosetPageActions actions={actions} />
    </>
  )
}

DesignRequestActions.fragments = {
  designRequest: gql`
    fragment DesignRequestActionsDesignRequestFragment on DesignRequest {
      id
      status
    }
  `,
}

const REJECT_DESIGN_REQUEST = gql`
  mutation UseDesignRequestActionsRejectDesignRequestMutation(
    $input: DesignRequestRejectInput!
  ) {
    designRequestReject(input: $input) {
      designRequest {
        id
      }
    }
  }
`

export default DesignRequestActions
