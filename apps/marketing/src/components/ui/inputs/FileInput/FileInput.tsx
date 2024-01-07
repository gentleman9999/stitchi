import useFileUpload from '@components/hooks/useFileUpload'
import { Photo } from 'icons'
import React, { useRef } from 'react'
import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { notEmpty } from '@lib/utils/typescript'
import FilePreview from './FilePreview'

interface Props {
  folder: string
  fileIds: string[]
  onChange: (fileIds: string[]) => void
  keepUploadStatus?: boolean
  accept?: HTMLInputElement['accept']
}

const FileInput = ({
  folder,
  fileIds,
  onChange,
  keepUploadStatus,
  accept,
}: Props) => {
  const [isDragging, setIsDragging] = React.useState(false)
  const { handleUpload, uploadingFiles } = useFileUpload()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropzoneRef = useRef<HTMLDivElement>(null)

  const handleFileChange = async (files: FileList | File[] | null) => {
    if (files) {
      const uploadedFiles = await handleUpload(Array.from(files), { folder })

      onChange(
        Array.from(
          new Set([...fileIds, ...(uploadedFiles?.map(f => f.id) || [])]),
        ).filter(notEmpty),
      )
    }
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget === e.target) {
      setIsDragging(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const acceptedFiles = Array.from(e.dataTransfer.files).filter(file =>
      accept ? isValidFileType(file, accept) : true,
    )

    if (acceptedFiles.length) {
      handleFileChange(acceptedFiles)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full">
        <div
          className={cx(
            'flex justify-center rounded-sm border border-dashed border-gray-900/25 px-6 py-10 cursor-pointer',
            {
              'bg-gray-100': isDragging,
            },
          )}
          ref={dropzoneRef}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="text-center">
            <Photo
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-sm bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  multiple
                  accept={accept}
                  type="file"
                  className="sr-only"
                  ref={fileInputRef}
                  onChange={e => handleFileChange(e.target.files)}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              {getAcceptedFileTypes(accept)} up to 10MB
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {uploadingFiles.map(file => {
          if (file.fileId && !keepUploadStatus) {
            return null
          }

          // We can remove a file from the list, but it won't be removed from "uploaded files" returned by the hook
          // If the file is uploaded successfully (has fileId) and the fileIds list doesn't include it, don't show it.
          if (file.fileId && !fileIds.includes(file.fileId)) {
            return null
          }

          return (
            <motion.div
              key={file.fileName}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FilePreview
                file={file}
                onRemove={() => {
                  onChange(fileIds.filter(id => id !== file.fileId))
                }}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

const isValidFileType = (file: File, accept: HTMLInputElement['accept']) => {
  if (!accept.length) return true

  const acceptedTypes = accept.replaceAll(' ', '').split(',')

  return acceptedTypes.some(type => {
    if (type.endsWith('/*')) {
      const typePrefix = type.slice(0, -1)

      return file.type.startsWith(typePrefix)
    } else {
      return file.type === type
    }
  })
}

const mimeToDescription: Record<HTMLInputElement['accept'], string> = {
  'image/jpeg': 'JPG',
  'image/jpg': 'JPG',
  'image/png': 'PNG',
  'image/gif': 'GIF',
  'image/bmp': 'BMP',
  'image/svg+xml': 'SVG',
  'image/webp': 'WEBP',
  'image/tiff': 'TIFF',
  'application/pdf': 'PDF',
  'application/msword': 'DOC',
  'text/plain': 'TXT',
  'text/csv': 'CSV',
  'audio/mpeg': 'MP3',
  'audio/wav': 'WAV',
  'audio/ogg': 'OGG',
  'video/mp4': 'MP4',
  'video/mpeg': 'MPEG',
  'video/ogg': 'OGV',
  'video/webm': 'WEBM',
  'video/x-msvideo': 'AVI',
}

function getAcceptedFileTypes(accept?: HTMLInputElement['accept']) {
  if (!accept) return 'Any file type'

  const mimeTypes = accept.replaceAll(' ', '').split(',')

  // Map the MIME types to descriptions and keep up to 4
  const fileTypes = mimeTypes
    .flatMap(mimeType => {
      if (mimeType.endsWith('/*')) {
        const typePrefix = mimeType.slice(0, -1)

        return Object.keys(mimeToDescription)
          .filter(mimeType => mimeType.startsWith(typePrefix))
          .map(mimeType => mimeToDescription[mimeType])
      } else {
        return mimeToDescription[mimeType] || null
      }
    })
    .filter(Boolean)

  return fileTypes.join(', ')
}

export default FileInput
