import { gql } from '@apollo/client'
import { DesignRequestOverviewDesignRequestFragment } from '@generated/DesignRequestOverviewDesignRequestFragment'
import React from 'react'
import Progress from './Progress'
import DesignRequestDraft from './DesignRequestDraft'
import GeneralInformation from './GeneralInformation'
import DesignRequestOverviewProductList from './DesignRequestOverviewProductList'
import { notEmpty } from '@utils/typescript'

interface Props {
  designRequest: DesignRequestOverviewDesignRequestFragment
}

const DesignRequestOverview = ({ designRequest }: Props) => {
  const designRequestProducts = designRequest.designRequestProducts || []

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 md:col-span-8">
        {designRequest.status === 'DRAFT' ? (
          <DesignRequestDraft designRequest={designRequest} />
        ) : (
          <GeneralInformation designRequest={designRequest} />
        )}
      </div>

      <div className="col-span-12 md:col-span-4 flex flex-col gap-8">
        {designRequestProducts.length ? (
          <DesignRequestOverviewProductList products={designRequestProducts} />
        ) : null}
        <Progress status={designRequest?.status} />
      </div>
    </div>
  )
}

DesignRequestOverview.fragments = {
  designRequest: gql`
    ${DesignRequestDraft.fragments.designRequest}
    ${GeneralInformation.fragments.designRequest}
    ${DesignRequestOverviewProductList.fragments.designRequestProduct}
    fragment DesignRequestOverviewDesignRequestFragment on DesignRequest {
      id
      status
      designRequestProducts {
        id
        ...DesignRequestOverviewProductListDesignRequestProductFragment
      }
      ...DesignRequestDraftDesignRequestFragments
      ...DesignRequestSubmittedDesignRequestGeneralInformationFragment
    }
  `,
}

export default DesignRequestOverview
