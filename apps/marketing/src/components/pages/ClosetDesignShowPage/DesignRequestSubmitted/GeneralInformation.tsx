import { gql } from '@apollo/client'
import { DesignRequestSubmittedDesignRequestGeneralInformationFragment } from '@generated/DesignRequestSubmittedDesignRequestGeneralInformationFragment'
import React from 'react'
import DesignLocationPreview from '../DesignLocationPreview'

interface Props {
  designRequest: DesignRequestSubmittedDesignRequestGeneralInformationFragment
}

const GeneralInformation = ({ designRequest }: Props) => {
  return (
    <div className="flex flex-col gap-12 rounded-md border col-span-1 md:col-span-5 bg-gray-50">
      <div className="flex flex-col gap-6 divide-y">
        <div className="px-6 pt-6 flex flex-col gap-4">
          <Item label="Description" value={designRequest.description} />
          <Item label="Use case" value={designRequest.useCase} />
        </div>
        <div className="p-6">
          <h2 className="text-sm font-semibold leading-7">Design locations</h2>
          <div className="mt-2 grid grid-cols-1 gap-y-2">
            {designRequest.designLocations.map(location => (
              <DesignLocationPreview
                key={location.id}
                location={location}
                defaultExpanded={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Item = ({
  label,
  value,
}: {
  label: React.ReactNode
  value: React.ReactNode
}) => {
  return (
    <div className="text-sm">
      <div className="font-semibold">{label}</div>
      <div className="font-medium text-gray-400">{value}</div>
    </div>
  )
}

GeneralInformation.fragments = {
  designRequest: gql`
    ${DesignLocationPreview.fragments.designLocation}

    fragment DesignRequestSubmittedDesignRequestGeneralInformationFragment on DesignRequest {
      id
      description
      useCase
      designLocations {
        id
        ...DesignLocationPreviewDesignLocationFragment
      }
    }
  `,
}

export default GeneralInformation
