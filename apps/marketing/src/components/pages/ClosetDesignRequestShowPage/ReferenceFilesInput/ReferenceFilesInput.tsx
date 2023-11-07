import FileInput from '@components/ui/inputs/FileInput'
import React from 'react'
import ReferenceFilePreview, { ReferenceFile } from '../ReferenceFilePreview'

interface Props {
  folder: string
  referenceFiles: ReferenceFile[]
  value: string[]
  onChange: (value: string[]) => void
}

const ReferenceFilesInput = ({
  folder,
  referenceFiles,
  value,
  onChange,
}: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <FileInput folder={folder} fileIds={value} onChange={onChange} />

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
