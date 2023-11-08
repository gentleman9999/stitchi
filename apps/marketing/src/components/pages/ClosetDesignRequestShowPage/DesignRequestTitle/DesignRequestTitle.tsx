import ClosetPageTitle from '@components/common/ClosetPageTitle'
import React from 'react'
import DesignRequestEditableName from './DesignRequestEditableName'
import DesignRequestActions from './DesignRequestActions'
import { gql } from '@apollo/client'
import { format, parseISO } from 'date-fns'
import { DesignRequestTitleDesignRequesetFragment } from '@generated/types'
import Badge from '@components/ui/Badge'
import { getDesignRequestBadgeProps } from '@lib/design-request'

interface Props {
  loading: boolean
  designRequest?: DesignRequestTitleDesignRequesetFragment | null
}

const DesignRequestTitle = ({ loading, designRequest }: Props) => {
  return (
    <ClosetPageTitle
      actions={
        designRequest ? (
          <DesignRequestActions designRequest={designRequest} />
        ) : null
      }
      title={
        <>
          <div className="sm:hidden">{designRequest?.name}</div>
          <div className="hidden sm:block">
            <DesignRequestEditableName
              name={designRequest?.name}
              loading={loading}
              designRequestId={designRequest?.id}
            />
          </div>
        </>
      }
      description={
        designRequest ? (
          <div className="flex flex-col sm:flex-row sm:gap-4 sm:items-center">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
              <span className="text-sm">
                Submitted{' '}
                <b>{format(parseISO(designRequest.createdAt), 'PPP')}</b>
              </span>
              <span className="hidden sm:block">·</span>
              <div>
                <Badge
                  {...getDesignRequestBadgeProps(designRequest)}
                  size="small"
                />
              </div>
            </div>
          </div>
        ) : null
      }
    />
  )
}

DesignRequestTitle.fragments = {
  designRequest: gql`
    ${DesignRequestActions.fragments.designRequest}

    fragment DesignRequestTitleDesignRequesetFragment on DesignRequest {
      id
      name
      createdAt
      status
      humanizedStatus
      ...DesignRequestActionsDesignRequestFragment
    }
  `,
}

export default DesignRequestTitle
