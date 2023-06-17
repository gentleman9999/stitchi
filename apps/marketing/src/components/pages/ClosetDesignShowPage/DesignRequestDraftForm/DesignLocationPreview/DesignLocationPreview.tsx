import { LinkInline } from '@components/ui'
import { Link, XIcon } from 'icons'
import React from 'react'

interface DesignLocation {
  id: number
  placement: string
  description: string
  referenceFiles: { type: string; url: string }[]
}

interface Props {
  location: DesignLocation
  onRemove?: () => void
}

const DesignLocationPreview = ({ location, onRemove }: Props) => {
  return (
    <div className="relative rounded-lg bg-gray-50 ring-1 ring-gray-900/5 shadow-magical">
      {onRemove && (
        <button className="absolute top-4 right-4" onClick={onRemove}>
          <XIcon className="w-5 h-5" />
        </button>
      )}

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
                    className="flex items-center gap-1"
                  >
                    <div>
                      <Link className="w-4 h-4 stroke-2" />
                    </div>
                    <div className="line-clamp-1">{file.url}</div>
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
  )
}

export default DesignLocationPreview
