import useFileUpload from '@hooks/useFileUpload'
import { Photo } from 'icons'
import React, { useRef } from 'react'
import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { notEmpty } from '@utils/typescript'

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
    <>
      <div className="col-span-full">
        <div
          className={cx(
            'flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 cursor-pointer',
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
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
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
        {uploadingFiles.map(file =>
          file.pctComplete === 1 && !keepUploadStatus ? null : (
            <motion.div
              key={file.fileName}
              className="flex items-center justify-between gap-4"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="text-sm font-medium text-gray-900">
                {file.fileName}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">
                  {(file.pctComplete * 100).toFixed()}%
                </span>
                <span className="relative ml-auto text-sm bg-gray-100 w-[150px] h-2 rounded-full overflow-hidden">
                  <span
                    className="absolute inset-0 bg-primary transition-all"
                    style={{
                      width: `${file.pctComplete * 100}%`,
                    }}
                  />
                </span>
              </div>
            </motion.div>
          ),
        )}
      </AnimatePresence>
    </>
  )
}

const isValidFileType = (file: File, accept: HTMLInputElement['accept']) => {
  const types = accept.replaceAll(' ', '').split(',')

  return types.some(type => {
    if (type.endsWith('/*')) {
      const typePrefix = accept.slice(0, -1)
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
