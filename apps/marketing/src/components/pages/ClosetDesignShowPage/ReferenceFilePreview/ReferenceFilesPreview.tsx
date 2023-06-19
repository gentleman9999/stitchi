import { gql } from '@apollo/client'
import { Button } from '@components/ui'
import { ReferenceFilePreviewDesignRequestFragment } from '@generated/ReferenceFilePreviewDesignRequestFragment'
import { PaperClip } from 'icons'
import React from 'react'

interface Props {
  designRequest: ReferenceFilePreviewDesignRequestFragment
  onDelete?: (fileId: string) => void
  visibleFileIds?: string[]
}

const ReferenceFilesPreview = ({
  designRequest,
  onDelete,
  visibleFileIds,
}: Props) => {
  return (
    <div className="flex flex-col border rounded-lg divide-y">
      {designRequest.files
        .filter(file =>
          visibleFileIds?.length ? visibleFileIds.includes(file.id) : true,
        )
        .map(file => {
          let Icon

          switch (file.__typename) {
            case 'FileImage':
              Icon = (
                <div>
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-[50px] max-h-10 object-contain"
                  />
                </div>
              )

              break

            case 'FilePdf':
              Icon = (
                <img
                  src={file.url.replace('.pdf', '.jpg')}
                  alt={file.name}
                  className="w-[50px] max-h-10 object-contain"
                />
              )
              break

            default:
              Icon = (
                <div className="w-[50px] flex items-center justify-center">
                  <PaperClip className="w-5 h-5 text-gray-400" />
                </div>
              )
          }

          return (
            <div
              key={file.id}
              className="p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 text-sm">
                {Icon}
                <div>
                  <span className="font-medium">{file.name}</span>{' '}
                  <span className="text-gray-400">{file.humanizedBytes}</span>
                </div>
              </div>

              <div className="divide-x gap-4 flex items-center justify-between">
                <Button
                  slim
                  variant="naked"
                  Component="a"
                  href={file.url}
                  className="!text-sm"
                  {...{ target: '_blank' }}
                >
                  View
                </Button>

                {onDelete && (
                  <Button
                    slim
                    variant="naked"
                    className="!text-sm"
                    onClick={() => onDelete(file.id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          )
        })}
    </div>
  )
}

ReferenceFilesPreview.fragments = {
  designRequest: gql`
    fragment ReferenceFilePreviewDesignRequestFragment on DesignRequest {
      id
      files {
        id
        url
        name
        humanizedBytes

        ... on FileImage {
          width
          height
        }
      }
    }
  `,
}

export default ReferenceFilesPreview
