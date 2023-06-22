import { gql } from '@apollo/client'
import { LoadingDots } from '@components/ui'
import { DesignLocationPreviewDesignLocationFragment } from '@generated/DesignLocationPreviewDesignLocationFragment'
import React from 'react'
import ReferenceFilesPreview from '../../../ReferenceFilePreview'

interface Props {
  location: DesignLocationPreviewDesignLocationFragment
  onRemove?: () => Promise<void> | void
  onUpdate?: () => Promise<void> | void
}

const DesignLocationPreview = ({ location, onRemove, onUpdate }: Props) => {
  const [removing, setRemoving] = React.useState(false)
  const [updating, setUpdating] = React.useState(false)

  const handleRemove = async () => {
    setRemoving(true)
    await onRemove?.()
    setRemoving(false)
  }

  const handleUpdate = async () => {
    setUpdating(true)
    await onUpdate?.()
    setUpdating(false)
  }

  return (
    <div className="relative rounded-md ring-1 ring-gray-900/5 shadow-sm">
      <dl className="flex flex-wrap">
        <div className="flex-auto px-6 pt-6">
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

      {onRemove || onUpdate ? (
        <div className="mt-6 border-t border-gray-900/5 grid grid-cols-2 divide-x">
          {onRemove && (
            <button
              className="py-4 px-6 text-sm font-semibold leading-6 text-gray-900"
              onClick={handleRemove}
            >
              {removing ? <LoadingDots /> : <>Remove</>}
            </button>
          )}
          {onUpdate && (
            <button
              className="py-4 px-6 text-sm font-semibold leading-6 text-gray-900"
              onClick={handleUpdate}
            >
              {updating ? (
                <LoadingDots />
              ) : (
                <>
                  Modify <span aria-hidden="true">&rarr;</span>
                </>
              )}
            </button>
          )}
        </div>
      ) : (
        <div className="mt-6" />
      )}
    </div>
  )
}

DesignLocationPreview.fragments = {
  designLocation: gql`
    fragment DesignLocationPreviewDesignLocationFragment on DesignRequestDesignLocation {
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
  `,
}

export default DesignLocationPreview
