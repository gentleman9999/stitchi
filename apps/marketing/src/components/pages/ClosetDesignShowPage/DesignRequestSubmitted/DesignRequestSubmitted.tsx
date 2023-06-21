import { gql } from '@apollo/client'
import { DesignRequestSubmittedDesignRequestFragment } from '@generated/DesignRequestSubmittedDesignRequestFragment'
import React from 'react'
import DesignRequestHistory from './DesignRequestHistory'
import DesignRequestMessageInput from './DesignRequestMessageInput'
import GeneralInformation from './GeneralInformation'

interface Props {
  designRequest: DesignRequestSubmittedDesignRequestFragment
}

const DesignRequestSubmitted = ({ designRequest }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
      <div className="col-span-1 md:col-span-7 flex flex-col gap-8">
        <DesignRequestMessageInput />
        <DesignRequestHistory designRequest={designRequest} />
      </div>
      <div className="col-span-1 md:col-span-5">
        <GeneralInformation designRequest={designRequest} />
      </div>
    </div>
  )
}

DesignRequestSubmitted.fragments = {
  designRequest: gql`
    ${GeneralInformation.fragments.designRequest}
    ${DesignRequestHistory.fragments.designRequest}
    fragment DesignRequestSubmittedDesignRequestFragment on DesignRequest {
      id
      ...DesignRequestHistoryDesignRequestFragment
      ...DesignRequestSubmittedDesignRequestGeneralInformationFragment
    }
  `,
}

export default DesignRequestSubmitted
