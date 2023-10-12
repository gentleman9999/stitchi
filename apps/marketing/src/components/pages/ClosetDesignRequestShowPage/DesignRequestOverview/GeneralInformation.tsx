import { gql } from '@apollo/client'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card'
import {
  DesignRequestSubmittedDesignRequestGeneralInformationFragment,
  DesignRequestSubmittedDesignRequestGeneralInformationFragment_designRequestLocations,
} from '@generated/DesignRequestSubmittedDesignRequestGeneralInformationFragment'
import { generateHTML } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import ReferenceFilesPreview from '../ReferenceFilePreview/ReferenceFilesPreview'

interface Props {
  designRequest: DesignRequestSubmittedDesignRequestGeneralInformationFragment
}

const GeneralInformation = ({ designRequest }: Props) => {
  let description
  if (designRequest.description?.length) {
    try {
      description = generateHTML(JSON.parse(designRequest.description), [
        StarterKit,
      ])
    } catch (e) {
      description = designRequest.description
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle
          title="Design request information"
          subtitle="Overview and design locations."
        />
      </CardHeader>
      <CardContent divide>
        <div className="flex flex-col gap-6">
          {description ? (
            <Item
              label="Description"
              value={
                <div
                  className="prose prose-sm"
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              }
            />
          ) : null}

          <Item
            label="Design files"
            value={
              designRequest.files.length ? (
                <ReferenceFilesPreview
                  files={designRequest.files.map(file => ({
                    ...file,
                    bytes: file.humanizedBytes,
                  }))}
                />
              ) : (
                'None provided'
              )
            }
          />

          <Item
            label="Design locations"
            value={
              designRequest.designRequestLocations.length ? (
                <div className="mt-2 flex flex-col gap-2">
                  {designRequest.designRequestLocations.map(location => (
                    <DesignLocation location={location} key={location.id} />
                  ))}
                </div>
              ) : (
                'None provided'
              )
            }
          />
        </div>
      </CardContent>
    </Card>
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
      <div className="font-medium text-gray-500 mb-1">{label}</div>
      <div className="font-medium text-gray-800">{value}</div>
    </div>
  )
}

const DesignLocation = ({
  location,
}: {
  location: DesignRequestSubmittedDesignRequestGeneralInformationFragment_designRequestLocations
}) => {
  return (
    <div className="border rounded-sm py-2 px-3">
      <div className="flex items-center justify-between">
        <span className=" font-semibold text-gray-500">
          {location.placement}
        </span>
      </div>
    </div>
  )
}

GeneralInformation.fragments = {
  designRequest: gql`
    fragment DesignRequestSubmittedDesignRequestGeneralInformationFragment on DesignRequest {
      id
      description
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
