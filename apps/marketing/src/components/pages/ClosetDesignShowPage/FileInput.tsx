import useFileUpload from '@hooks/useFileUpload'
import { Photo } from 'icons'
import React, { useRef } from 'react'
import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  folder: string
  fileIds: string[]
  onChange: (fileIds: string[]) => void
}

const FileInput = ({ folder, fileIds, onChange }: Props) => {
  const [isDragging, setIsDragging] = React.useState(false)
  const { handleUpload, uploadingFiles } = useFileUpload()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropzoneRef = useRef<HTMLDivElement>(null)

  const handleFileChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async e => {
    if (e.target.files) {
      const files = await handleUpload(Array.from(e.target.files), { folder })
      onChange(
        Array.from(new Set([...fileIds, ...(files?.map(f => f.id) || [])])),
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

    if (e.dataTransfer.files.length) {
      // Handle file upload here (e.g., call a function to upload the file)
      const files = await handleUpload(Array.from(e.dataTransfer.files), {
        folder,
      })
      onChange(
        Array.from(new Set([...fileIds, ...(files?.map(f => f.id) || [])])),
      )
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
            'mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 cursor-pointer',
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
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  type="file"
                  className="sr-only"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PDF, PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div>

      <div>
        <AnimatePresence>
          {uploadingFiles.map(file =>
            file.pctComplete === 1 ? null : (
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
      </div>
    </>
  )
}

export default FileInput
