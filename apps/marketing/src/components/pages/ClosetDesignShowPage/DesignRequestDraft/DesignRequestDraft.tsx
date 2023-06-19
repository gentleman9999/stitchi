import { Button, Dialog, InputGroup } from '@components/ui'
import React, { useState } from 'react'
import AddDesignLocationButton from './AddDesignLocationButton'
import AdditionalInformationForm from './AdditionalInformationForm'
import DesignLocationForm, {
  Props as DesignLocationFormProps,
} from './DesignLocationForm/DesignLocationForm'
import DesignLocationPreview from '../DesignLocationPreview'
import useDesignRequestDraft from './useDesignRequestDraft'
import { gql } from '@apollo/client'
import { DesignRequestDraftDesignRequestFragments } from '@generated/DesignRequestDraftDesignRequestFragments'

interface DesignLocation {
  id: number
  placement: string
  description: string
  referenceFileIds: string[]
}

interface Props {
  designRequest: DesignRequestDraftDesignRequestFragments
}

const DesignRequestDraft = ({ designRequest }: Props) => {
  const { handleUpdateDesignRequest } = useDesignRequestDraft({
    designRequestId: designRequest.id,
  })

  const [showLocationForm, setShowLocationForm] = useState(false)
  const [designLocations, setDesignLocations] = useState<DesignLocation[]>([])

  const handleAddDesignLocation: DesignLocationFormProps['onSubmit'] = data => {
    setShowLocationForm(false)
    setDesignLocations(prev => [...prev, { ...data, id: prev.length + 1 }])
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <AdditionalInformationForm
          designRequest={designRequest}
          fileFolder={designRequest.fileUploadDirectory}
          defaultValues={{
            description: designRequest.description || undefined,
            referenceFileIds: designRequest.fileIds || [],
          }}
          onSubmit={async input =>
            handleUpdateDesignRequest({
              fileIds: input.referenceFileIds,
              description: input.description,
            })
          }
        />
      </div>

      <div>
        <div>
          <h2 className="text-2xl font-semibold leading-7">Design locations</h2>
          <div className="mt-10 grid grid-cols-1 gap-y-8">
            {designLocations.map((location, index) => (
              <DesignLocationPreview
                key={location.id}
                location={location}
                onRemove={() => {
                  setDesignLocations(prev => {
                    const newLocations = [...prev]
                    newLocations.splice(index, 1)
                    return newLocations
                  })
                }}
              />
            ))}

            {showLocationForm ? (
              <DesignLocationForm
                fileFolder={designRequest.fileUploadDirectory}
                onSubmit={handleAddDesignLocation}
                defaultValues={{
                  placement: 'Front',
                  description:
                    'Design on the front of the shirt. Design on the front of the shirt. Design on the front of the shirt. Design on the front of the shirt.',
                  referenceFileIds: [],
                }}
                renderContainer={props => (
                  <Dialog
                    open
                    mobileFullScreen
                    onClose={() => setShowLocationForm(false)}
                  >
                    <Dialog.Title className="flex items-center justify-between">
                      Add design location
                      <Button
                        slim
                        variant="naked"
                        className="!text-sm"
                        onClick={() => setShowLocationForm(false)}
                      >
                        Cancel
                      </Button>
                    </Dialog.Title>
                    <Dialog.Content dividers>{props.children}</Dialog.Content>
                    <Dialog.Actions className="flex justify-end">
                      <Button color="brandPrimary" onClick={props.onSubmit}>
                        Add location
                      </Button>
                    </Dialog.Actions>
                  </Dialog>
                )}
              />
            ) : (
              <InputGroup>
                <AddDesignLocationButton
                  onClick={() => setShowLocationForm(true)}
                />
              </InputGroup>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

DesignRequestDraft.fragments = {
  designRequest: gql`
    ${AdditionalInformationForm.fragments.designRequest}
    fragment DesignRequestDraftDesignRequestFragments on DesignRequest {
      id
      description
      fileUploadDirectory
      fileIds
      ...AdditionalInformationFormDesignRequestFragment
    }
  `,
}

export default DesignRequestDraft
