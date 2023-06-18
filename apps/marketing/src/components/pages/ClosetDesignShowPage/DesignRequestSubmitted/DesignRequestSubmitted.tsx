import { gql } from '@apollo/client'
import { DesignRequestSubmittedDesignRequestFragment } from '@generated/DesignRequestSubmittedDesignRequestFragment'
import React from 'react'
import DesignLocationPreview from '../DesignLocationPreview'

const designLocations = [
  {
    id: 1,
    placement: 'Front',
    description:
      'Design on the front of the shirt. Design on the front of the shirt. Design on the front of the shirt. Design on the front of the shirt.',
    referenceFiles: [
      {
        type: 'image',
        url: 'https://www.stitchi.co/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-ycjcgspsys%2Fimages%2Fstencil%2F300w%2Fattribute_rule_images%2F166304_source_1684166140.jpg&w=1200&q=75',
      },
    ],
  },
]

interface Props {
  designRequest: DesignRequestSubmittedDesignRequestFragment
}

const DesignRequestSubmitted = ({ designRequest }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        {/* <AdditionalInformationForm
          defaultValues={{
            description: designRequest.description || undefined,
          }}
          onSubmit={input =>
            handleUpdateDesignRequest({
              description: input.description,
            })
          }
        /> */}
      </div>

      <div>
        <div>
          <h2 className="text-2xl font-semibold leading-7">Design locations</h2>
          <div className="mt-10 grid grid-cols-1 gap-y-8">
            {designLocations.map(location => (
              <DesignLocationPreview key={location.id} location={location} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

DesignRequestSubmitted.fragments = {
  designRequest: gql`
    fragment DesignRequestSubmittedDesignRequestFragment on DesignRequest {
      id
      description
    }
  `,
}

export default DesignRequestSubmitted
