import { gql } from '@apollo/client'
import { DesignRequestSubmittedDesignRequestFragment } from '@generated/DesignRequestSubmittedDesignRequestFragment'
import React from 'react'
import GeneralInformation from './GeneralInformation'

interface Props {
  designRequest: DesignRequestSubmittedDesignRequestFragment
}

const DesignRequestSubmitted = ({ designRequest }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
      <div className="col-span-1 md:col-span-7"></div>
      <GeneralInformation designRequest={designRequest} />
    </div>
  )
}

DesignRequestSubmitted.fragments = {
  designRequest: gql`
    ${GeneralInformation.fragments.designRequest}
    fragment DesignRequestSubmittedDesignRequestFragment on DesignRequest {
      id

      ...DesignRequestSubmittedDesignRequestGeneralInformationFragment
    }
  `,
}

export default DesignRequestSubmitted
