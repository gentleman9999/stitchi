import React from 'react'
import useDesignRequestDraft from './useDesignRequestDraft'
import { gql } from '@apollo/client'
import { DesignRequestDraftDesignRequestFragments } from '@generated/DesignRequestDraftDesignRequestFragments'
import DesignRequestDraftForm from './DesignRequestDraftForm'

const defaultPrintLocations = [
  {
    placement: 'Front',
    description: '',
    fileIds: [],
  },
  {
    placement: 'Back',
    description: '',
    fileIds: [],
  },
  {
    placement: 'Pocket',
    description: '',
    fileIds: [],
  },
  {
    placement: 'Left Sleeve',
    description: '',
    fileIds: [],
  },
  {
    placement: 'Right Sleeve',
    description: '',
    fileIds: [],
  },
  {
    placement: 'Other',
    description: '',
    fileIds: [],
  },
]

interface Props {
  designRequest: DesignRequestDraftDesignRequestFragments
}

const DesignRequestDraft = ({ designRequest }: Props) => {
  const { handleUpdateDesignRequest } = useDesignRequestDraft({
    designRequestId: designRequest.id,
  })

  return (
    <DesignRequestDraftForm
      designRequest={designRequest}
      fileFolder={designRequest.fileUploadDirectory}
      defaultValues={{
        useCase: designRequest.useCase || undefined,
        referenceFileIds: designRequest.fileIds || [],
        locations: designRequest.designRequestLocations.length
          ? designRequest.designRequestLocations.map(location => ({
              id: location.id,
              placement: location.placement || '',
              description: location.description || '',
              fileIds: location.fileIds || [],
            }))
          : defaultPrintLocations,
      }}
      onSubmit={async input =>
        handleUpdateDesignRequest({
          fileIds: input.referenceFileIds,
          useCase: input.useCase,
          locations: input.locations.map(location => ({
            designLocationId: location.id,
            description: location.description,
            placement: location.placement,
            fileIds: location.fileIds,
          })),
        })
      }
    />
  )
}

DesignRequestDraft.fragments = {
  designRequest: gql`
    ${DesignRequestDraftForm.fragments.designRequest}

    fragment DesignRequestDraftDesignRequestFragments on DesignRequest {
      id
      fileUploadDirectory
      useCase
      fileIds
      designRequestLocations {
        id
        description
        placement
        fileIds
      }
      ...AdditionalInformationFormDesignRequestFragment
    }
  `,
}

export default DesignRequestDraft
