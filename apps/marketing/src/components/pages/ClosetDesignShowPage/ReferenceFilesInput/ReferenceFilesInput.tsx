import React from 'react'
import FileInput from './FileInput'
import ReferenceFilePreview, { ReferenceFile } from '../ReferenceFilePreview'

interface Props {
  folder: string
  referenceFiles: ReferenceFile[]
  value: string[]
  onChange: (value: string[]) => void
  keepUploadStatus?: boolean
}

const ReferenceFilesInput = ({
  folder,
  referenceFiles,
  value,
  onChange,
  keepUploadStatus,
}: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <FileInput
        folder={folder}
        fileIds={value}
        onChange={onChange}
        keepUploadStatus={keepUploadStatus}
      />

      <ReferenceFilePreview
        files={referenceFiles.filter(file => value.includes(file.id))}
        onDelete={id => {
          onChange(value.filter(v => v !== id))
        }}
      />
    </div>
  )
}

export default ReferenceFilesInput
