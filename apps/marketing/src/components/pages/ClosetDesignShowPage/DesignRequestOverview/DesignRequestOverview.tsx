import { gql } from '@apollo/client'
import { DesignRequestOverviewDesignRequestFragment } from '@generated/DesignRequestOverviewDesignRequestFragment'
import React from 'react'
import ProgressBar from './ProgressBar'
import DesignRequestDraft from './DesignRequestDraft'
import GeneralInformation from './GeneralInformation'

interface Props {
  designRequest: DesignRequestOverviewDesignRequestFragment
}

const DesignRequestOverview = ({ designRequest }: Props) => {
  if (designRequest.status === 'DRAFT') {
    return <DesignRequestDraft designRequest={designRequest} />
  }
  return (
    <>
      <div className="mb-8">
        <ProgressBar status={designRequest?.status} />
      </div>
      <GeneralInformation designRequest={designRequest} />
    </>
  )
}

DesignRequestOverview.fragments = {
  designRequest: gql`
    ${DesignRequestDraft.fragments.designRequest}
    ${GeneralInformation.fragments.designRequest}

    fragment DesignRequestOverviewDesignRequestFragment on DesignRequest {
      id
      status
      ...DesignRequestDraftDesignRequestFragments
      ...DesignRequestSubmittedDesignRequestGeneralInformationFragment
    }
  `,
}

export default DesignRequestOverview
