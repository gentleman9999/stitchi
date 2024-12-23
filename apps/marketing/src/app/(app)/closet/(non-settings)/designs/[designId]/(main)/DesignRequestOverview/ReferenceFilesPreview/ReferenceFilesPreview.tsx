import Button from '@components/ui/Button'
import { FileType } from '@generated/globalTypes'
import { PaperClip } from 'icons'
import React from 'react'

interface File {
  fileType: FileType
  id: string
  url: string
  name: string
  bytes: string
}

interface ImageFile extends File {
  fileType: FileType.IMAGE
  width: number
  height: number
}

interface PdfFile extends File {
  fileType: FileType.PDF
}

export type ReferenceFile = ImageFile | PdfFile | File

interface Props {
  files: ReferenceFile[]
  onDelete?: (fileId: string) => void
  visibleFileIds?: string[]
}

const ReferenceFilesPreview = ({ files, onDelete, visibleFileIds }: Props) => {
  if (!files.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      {files
        .filter(file =>
          visibleFileIds?.length ? visibleFileIds.includes(file.id) : true,
        )
        .map(file => {
          let Icon

          switch (file.fileType) {
            case FileType.IMAGE:
              Icon = (
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-[50px] h-[50px] object-contain rounded-sm overflow-hidden"
                />
              )

              break

            case FileType.PDF:
              Icon = (
                <img
                  src={file.url.replace('.pdf', '.jpg')}
                  alt={file.name}
                  className="w-[50px] h-[50px] object-contain rounded-sm overflow-hidden"
                />
              )
              break

            default:
              Icon = (
                <div className="w-[50px] h-[50px] flex items-center justify-center">
                  <PaperClip className="w-5 h-5 text-gray-400" />
                </div>
              )
          }

          return (
            <div
              key={file.id}
              className="pl-1 pr-4 py-1 flex items-center justify-between gap-2 border rounded-sm flex-wrap"
            >
              <div className="flex items-center gap-2 text-sm flex-shrink">
                {Icon}

                <div className="flex flex-col truncate">
                  <div className="font-medium truncate">{file.name}</div>
                  <div className="text-gray-400 text-xs">{file.bytes}</div>
                </div>
              </div>

              <div className="divide-x gap-2 flex items-center justify-between">
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

export default ReferenceFilesPreview
