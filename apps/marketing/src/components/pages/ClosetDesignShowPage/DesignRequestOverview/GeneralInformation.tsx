import { gql } from '@apollo/client'
import { Button } from '@components/ui'
import {
  DesignRequestSubmittedDesignRequestDesignRequestDraftFormFragment,
  DesignRequestSubmittedDesignRequestDesignRequestDraftFormFragment_designRequestLocations,
} from '@generated/DesignRequestSubmittedDesignRequestDesignRequestDraftFormFragment'
import React from 'react'
import ReferenceFilesPreview from '../ReferenceFilePreview/ReferenceFilesPreview'

interface Props {
  designRequest: DesignRequestSubmittedDesignRequestDesignRequestDraftFormFragment
}

const GeneralInformation = ({ designRequest }: Props) => {
  return (
    <div className="flex flex-col gap-12 rounded-md border bg-gray-50">
      <div className="flex flex-col gap-6 divide-y">
        <div className="px-6 pt-6 flex flex-col gap-4">
          {designRequest.description ? (
            <Item label="Description" value={designRequest.description} />
          ) : null}

          <Item
            label="Use case"
            value={
              designRequest.useCase || (
                <span className="text-gray-400 font-normal">-</span>
              )
            }
          />
        </div>

        <div className="p-6">
          {designRequest.designRequestLocations.length ? (
            <>
              <h2 className="text-sm font-semibold leading-7">
                Design locations
              </h2>
              <div className="mt-2 flex flex-col divide-y">
                {designRequest.designRequestLocations.map(location =>
                  location.description?.length || location.files.length ? (
                    <div key={location.id} className="py-2">
                      <DesignLocation location={location} />
                    </div>
                  ) : null,
                )}
              </div>
            </>
          ) : (
            <span className="text-gray-400 text-sm">
              No design locations specified
            </span>
          )}
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

const DesignLocation = ({
  location,
}: {
  location: DesignRequestSubmittedDesignRequestDesignRequestDraftFormFragment_designRequestLocations
}) => {
  const [showDetails, setShowDetails] = React.useState(false)

  if (!showDetails) {
    return (
      <div className="">
        <div className="flex items-center justify-between">
          <span className=" font-semibold text-gray-500">
            {location.placement}
          </span>
          <Button
            variant="naked"
            className="!text-xs opacity-40"
            slim
            onClick={() => setShowDetails(true)}
          >
            View details
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="">
      <dl className="flex flex-wrap">
        <div className="flex-auto">
          <dt className="font-semibold leading-6 text-gray-900">
            {location.placement}
          </dt>
          <dd className="mt-1 text-sm font-medium text-gray-700">
            {location.description}
          </dd>
        </div>
      </dl>
      <dl className="pt-6 flex-auto line-clamp-3">
        <dt className="text-sm font-semibold leading-6 text-gray-900">
          Reference files
        </dt>
        <dd className="mt-1 text-sm font-semibold text-gray-700">
          {location.files.length ? (
            <ReferenceFilesPreview
              files={location.files.map(file => ({
                ...file,
                bytes: file.humanizedBytes,
              }))}
            />
          ) : (
            <span className="text-gray-500 font-normal">
              No reference files
            </span>
          )}
        </dd>
      </dl>

      <div className="mt-6" />
    </div>
  )
}

GeneralInformation.fragments = {
  designRequest: gql`
    fragment DesignRequestSubmittedDesignRequestGeneralInformationFragment on DesignRequest {
      id
      description
      useCase
      designRequestLocations {
        id
        description
        placement
        files {
          id
          humanizedBytes
          name
          url
          fileType

          ... on FileImage {
            width
            height
          }
        }
      }
    }
  `,
}

export default GeneralInformation
