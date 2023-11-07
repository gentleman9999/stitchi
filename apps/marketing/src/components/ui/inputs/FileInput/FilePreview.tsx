import { UploadingFile } from '@components/hooks/useFileUpload'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { PaperClipIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface Props {
  file: UploadingFile
  onRemove?: () => void
}

const FilePreview = ({ file, onRemove }: Props) => {
  return (
    <div className="border rounded-sm pl-1 pr-4 py-1 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <FileIcon file={file} />

        <span className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
          {file.fileName}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {file.fileId ? (
          <span className="text-sm font-medium text-green-400">Success</span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium">
              {getPctComplete(file.pctComplete)}
            </span>
            <span className="relative ml-auto text-sm bg-gray-100 w-[100px] h-2 rounded-full overflow-hidden">
              <span
                className="absolute inset-0 bg-primary transition-all"
                style={{
                  width: getPctComplete(file.pctComplete),
                }}
              />
            </span>
          </div>
        )}

        {Boolean(onRemove) && file.fileId ? (
          <button onClick={onRemove}>
            <XMarkIcon className="w-5 h-5 text-gray-400" />
          </button>
        ) : null}
      </div>
    </div>
  )
}

const FileIcon = ({ file }: Props) => {
  if (file.fileType?.startsWith('image')) {
    return (
      <img
        src={file.filePath}
        alt={file.fileName}
        className="w-[50px] h-[50px] object-contain rounded-md overflow-hidden"
      />
    )
  }

  return (
    <div className="w-[50px] h-[50px] flex items-center justify-center">
      <PaperClipIcon className="w-5 h-5 text-gray-400" />
    </div>
  )
}

const getPctComplete = (pct: number) => {
  let normalizedPct = pct * 100

  if (normalizedPct > 0) {
    // We want to show 99 because the upload mutation still has to run
    // Once we have a fileId, we replace the progress bar with a "success" state
    normalizedPct = normalizedPct - 1
  }

  return `${normalizedPct.toFixed()}%`
}

export default FilePreview
