import ClosetPageTitle from '@components/common/ClosetPageTitle'
import React from 'react'
import DesignRequestEditableName from './DesignRequestEditableName'
import DesignRequestActions from './DesignRequestActions'
import { gql } from '@apollo/client'
import { DesignRequestTitleDesignRequesetFragment } from '@generated/DesignRequestTitleDesignRequesetFragment'

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
    />
  )
}

DesignRequestTitle.fragments = {
  designRequest: gql`
    ${DesignRequestActions.fragments.designRequest}

    fragment DesignRequestTitleDesignRequesetFragment on DesignRequest {
      id
      name
      ...DesignRequestActionsDesignRequestFragment
    }
  `,
}

export default DesignRequestTitle
