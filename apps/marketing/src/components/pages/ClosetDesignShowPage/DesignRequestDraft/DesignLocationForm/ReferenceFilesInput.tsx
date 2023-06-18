import React from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import FileInput from '../../FileInput'

interface File {
  type: string
  value: string
}

interface Props<T extends Record<string, any>> {
  fieldName: keyof T
  form: UseFormReturn<T>
}

const ReferenceFilesInput = <T extends Record<string, any>>({
  fieldName,
  form,
}: Props<T>) => {
  const fileArray = useFieldArray({
    name: fieldName as any,
    control: form.control,
  })

  return <FileInput />
}

export default ReferenceFilesInput
