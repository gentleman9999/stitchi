import { Button, Dialog, InputGroup, TextField } from '@components/ui'
import { Plus } from 'icons'
import React, { useState } from 'react'
import AddDesignLocationButton from './AddDesignLocationButton'
import AdditionalInformationForm from './AdditionalInformationForm'
import DesignLocationForm, {
  Props as DesignLocationFormProps,
} from './DesignLocationForm/DesignLocationForm'
import DesignLocationPreview from './DesignLocationPreview'

interface DesignLocation {
  id: number
  placement: string
  description: string
  referenceFiles: { type: string; url: string }[]
}

interface Props {}

const DesignRequestDraftForm = (props: Props) => {
  const [showLocationForm, setShowLocationForm] = useState(false)
  const [designLocations, setDesignLocations] = useState<DesignLocation[]>([])

  const handleAddDesignLocation: DesignLocationFormProps['onSubmit'] = data => {
    setShowLocationForm(false)
    setDesignLocations(prev => [
      ...prev,
      {
        ...data,
        id: prev.length + 1,
      },
    ])
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <AdditionalInformationForm onSubmit={() => {}} />
      </div>

      <div>
        <div>
          <h2 className="text-2xl font-semibold leading-loose">
            Design locations
          </h2>
          <div className="grid grid-cols-2 gap-6">
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
                onSubmit={handleAddDesignLocation}
                defaultValues={{
                  placement: 'Front',
                  description:
                    'Design on the front of the shirt. Design on the front of the shirt. Design on the front of the shirt. Design on the front of the shirt.',
                  referenceFiles: [
                    {
                      type: 'image',
                      url: 'https://www.stitchi.co/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-ycjcgspsys%2Fimages%2Fstencil%2F300w%2Fattribute_rule_images%2F166304_source_1684166140.jpg&w=1200&q=75',
                    },
                  ],
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

export default DesignRequestDraftForm
