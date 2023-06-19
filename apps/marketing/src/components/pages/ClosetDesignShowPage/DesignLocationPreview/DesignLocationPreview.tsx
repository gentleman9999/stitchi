import { LinkInline } from '@components/ui'
import { Link, XIcon } from 'icons'
import React from 'react'

interface DesignLocation {
  id: number
  placement: string
  description: string
  referenceFileIds: string[]
}

interface Props {
  location: DesignLocation
  onRemove?: () => void
}

const DesignLocationPreview = ({ location, onRemove }: Props) => {
  return (
    <div className="relative rounded-lg  ring-1 ring-gray-900/5 shadow-sm">
      <dl className="flex flex-wrap">
        <div className="flex-auto pl-6 pt-6">
          <dt className="font-semibold leading-6 text-gray-900">
            {location.placement}
          </dt>
          <dd className="mt-1 text-sm font-medium text-gray-700">
            {location.description}
          </dd>
        </div>
      </dl>
      <dl className="px-6 pt-6 flex-auto line-clamp-3">
        <dt className="text-sm font-semibold leading-6 text-gray-900">
          Reference files
        </dt>
        <dd className="mt-1 text-sm font-semibold text-gray-700">
          {location.referenceFileIds.length ? (
            <>
              {/* {location.referenceFileIds.map(file => (
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
              ))} */}
            </>
          ) : (
            <>No reference files</>
          )}
        </dd>
      </dl>

      <div className="mt-6 border-t border-gray-900/5 grid grid-cols-2 divide-x">
        {onRemove && (
          <button
            className="py-4 px-6 text-sm font-semibold leading-6 text-gray-900"
            onClick={onRemove}
          >
            Remove
          </button>
        )}
        <button className="py-4 px-6 text-sm font-semibold leading-6 text-gray-900">
          Modify <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  )
}

export default DesignLocationPreview
