import { gql } from '@apollo/client'
import { DesignRequestActivityDesignRequestFragment } from '@generated/DesignRequestActivityDesignRequestFragment'
import React from 'react'
import DesignRequestPreview from './DesignRequestPreview'
import DesignRequestHistory from './DesignRequestHistory'
import DesignRequestMessageInput from './DesignRequestMessageInput'

interface Props {
  designRequest: DesignRequestActivityDesignRequestFragment
}

const DesignRequestActivity = ({ designRequest }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
      <div className="col-span-1 md:col-span-7 flex flex-col gap-8">
        <DesignRequestMessageInput designRequest={designRequest} />
        <DesignRequestHistory designRequest={designRequest} />
      </div>
      <div className="col-span-1 md:col-span-5 flex flex-col gap-8">
        <DesignRequestPreview />
      </div>
    </div>
  )
}

DesignRequestActivity.fragments = {
  designRequest: gql`
    ${DesignRequestHistory.fragments.designRequest}
    ${DesignRequestMessageInput.fragments.designRequest}
    fragment DesignRequestActivityDesignRequestFragment on DesignRequest {
      id
      ...DesignRequestHistoryDesignRequestFragment
      ...DesignRequestMessageInputDesignRequestFragment
    }
  `,
}

export default DesignRequestActivity
