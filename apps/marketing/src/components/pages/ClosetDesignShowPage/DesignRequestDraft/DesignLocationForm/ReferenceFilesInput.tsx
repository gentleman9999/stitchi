import React from 'react'
import { Controller, Path, UseFormReturn } from 'react-hook-form'
import FileInput from '../../FileInput'

interface Props<T extends Record<string, any>> {
  fieldName: Path<T>
  form: UseFormReturn<T>
  folder: string
}

const ReferenceFilesInput = <T extends Record<string, any>>({
  fieldName,
  form,
  folder,
}: Props<T>) => {
  return (
    <Controller
      name={fieldName}
      control={form.control}
      render={({ field }) => (
        <FileInput
          folder={folder}
          fileIds={field.value}
          onChange={field.onChange}
        />
      )}
    />
  )
}

export default ReferenceFilesInput
