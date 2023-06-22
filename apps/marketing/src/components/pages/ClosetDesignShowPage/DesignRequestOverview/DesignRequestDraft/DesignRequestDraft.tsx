import { Button, Dialog, InputGroup } from '@components/ui'
import React, { useState } from 'react'
import AddDesignLocationButton from './AddDesignLocationButton'
import GeneralInformation from './GeneralInformation'
import DesignLocationForm from './DesignLocationForm'
import DesignLocationPreview from './DesignLocationPreview'
import useDesignRequestDraft from './useDesignRequestDraft'
import { gql } from '@apollo/client'
import { DesignRequestDraftDesignRequestFragments } from '@generated/DesignRequestDraftDesignRequestFragments'

interface Props {
  designRequest: DesignRequestDraftDesignRequestFragments
}

const DesignRequestDraft = ({ designRequest }: Props) => {
  const { handleUpdateDesignRequest, handleRemoveDesignRequestLocation } =
    useDesignRequestDraft({
      designRequestId: designRequest.id,
    })

  const [locationForm, setLocationForm] = useState<boolean | string>(false)

  const handleAddDesignLocation = () => {
    setLocationForm(false)
  }

  const activeLocation = designRequest.designLocations.find(
    location => location.id === locationForm,
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <GeneralInformation
          designRequest={designRequest}
          fileFolder={designRequest.fileUploadDirectory}
          defaultValues={{
            useCase: designRequest.useCase || undefined,
            description: designRequest.description || undefined,
            referenceFileIds: designRequest.fileIds || [],
          }}
          onSubmit={async input =>
            handleUpdateDesignRequest({
              fileIds: input.referenceFileIds,
              description: input.description,
              useCase: input.useCase,
            })
          }
        />
      </div>

      <div>
        <div>
          <h2 className="text-2xl font-semibold leading-7">Design locations</h2>
          <div className="mt-10 grid grid-cols-1 gap-y-8">
            {designRequest.designLocations.map(location => (
              <DesignLocationPreview
                key={location.id}
                location={location}
                onRemove={async () =>
                  handleRemoveDesignRequestLocation({
                    designRequestDesignLocationId: location.id,
                  })
                }
                onUpdate={() => setLocationForm(location.id)}
              />
            ))}

            {locationForm ? (
              <DesignLocationForm
                designRequestId={designRequest.id}
                designLocation={activeLocation}
                fileFolder={designRequest.fileUploadDirectory}
                onSubmit={handleAddDesignLocation}
                renderContainer={props => (
                  <Dialog
                    open
                    mobileFullScreen
                    onClose={() => setLocationForm(false)}
                  >
                    <Dialog.Title className="flex items-center justify-between">
                      {activeLocation ? 'Update' : 'Add'} design location
                      <Button
                        slim
                        variant="naked"
                        className="!text-sm"
                        onClick={() => setLocationForm(false)}
                      >
                        Cancel
                      </Button>
                    </Dialog.Title>
                    <Dialog.Content dividers>{props.children}</Dialog.Content>
                    <Dialog.Actions className="flex justify-end">
                      <Button
                        slim
                        color="brandPrimary"
                        onClick={props.onSubmit}
                        loading={props.loading}
                      >
                        {activeLocation ? 'Update' : 'Add'} location
                      </Button>
                    </Dialog.Actions>
                  </Dialog>
                )}
              />
            ) : (
              <InputGroup>
                <AddDesignLocationButton
                  onClick={() => setLocationForm(true)}
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
    ${GeneralInformation.fragments.designRequest}
    ${DesignLocationPreview.fragments.designLocation}
    ${DesignLocationForm.fragments.designLocation}
    fragment DesignRequestDraftDesignRequestFragments on DesignRequest {
      id
      description
      fileUploadDirectory
      useCase
      fileIds
      designLocations {
        id
        description
        placement
        fileIds
        ...DesignLocationPreviewDesignLocationFragment
        ...DesignLocationFormDesignLocationFragment
      }
      ...AdditionalInformationFormDesignRequestFragment
    }
  `,
}

export default DesignRequestDraft
