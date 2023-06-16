import { LinkInline } from '@components/ui'
import { XIcon } from 'icons'
import React from 'react'
import DesignLocationForm from './DesignLocationForm'

const designLocatoins = [
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

interface Props {}

const DesignRequestDraftForm = (props: Props) => {
  return (
    <div>
      <div className="grid grid-cols-4">
        {designLocatoins.map(location => (
          <div
            key={location.id}
            className="relative rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5"
          >
            <button className="absolute top-4 right-4">
              <XIcon className="w-5 h-5" />
            </button>
            <dl className="flex flex-wrap">
              <div className="flex-auto pl-6 pt-6">
                <dt className="text-sm font-semibold leading-6 text-gray-900">
                  Placement
                </dt>
                <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
                  {location.placement}
                </dd>
              </div>
            </dl>
            <div className="mt-6 border-t border-gray-900/5">
              <dl className="px-6 pt-6 flex-auto line-clamp-3">
                <dt className="text-sm font-semibold leading-6 text-gray-900">
                  Description
                </dt>
                <dd className="mt-1 text-sm font-medium text-gray-700">
                  {location.description}
                </dd>
              </dl>

              <dl className="px-6 pt-6 flex-auto line-clamp-3">
                <dt className="text-sm font-semibold leading-6 text-gray-900">
                  Reference files
                </dt>
                <dd className="mt-1 text-sm font-semibold text-gray-700">
                  {location.referenceFiles.length ? (
                    <>
                      {location.referenceFiles.map(file => (
                        <LinkInline
                          external
                          key={file.url}
                          href={file.url}
                          className="line-clamp-1"
                        >
                          {file.url}
                        </LinkInline>
                      ))}
                    </>
                  ) : (
                    <>No reference files</>
                  )}
                </dd>
              </dl>
            </div>

            <div className="mt-6 border-t border-gray-900/5 px-6 py-6 flex justify-between">
              <button className="text-sm font-semibold leading-6 text-gray-900">
                Modfy <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <DesignLocationForm />
    </div>
  )
}

export default DesignRequestDraftForm
