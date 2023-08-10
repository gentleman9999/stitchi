import { FileInput, InputGroup } from '@components/ui'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  fileIds: yup.array().of(yup.string().uuid().required()).required(),
})

type FormValues = yup.InferType<typeof schema>

interface Props {
  folder: string
  onChange?: (values: FormValues) => void
}

const BrandFilesForm = ({ onChange, folder }: Props) => {
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      fileIds: [],
    },
  })

  const { trigger, getValues, reset } = form
  const { isDirty } = form.formState
  const { fileIds } = form.watch()

  const handleSubmit = form.handleSubmit(async values => {})

  React.useEffect(() => {
    const run = async () => {
      const isValid = await trigger()
      if (isValid) {
        onChange?.(getValues())
        reset()
      }
    }

    if (isDirty) {
      run()
    }
  }, [fileIds, getValues, isDirty, onChange, reset, trigger])

  return (
    <form onSubmit={handleSubmit}>
      <Controller
        name="fileIds"
        control={form.control}
        render={({ field, fieldState }) => (
          <InputGroup error={fieldState.error?.message}>
            <FileInput
              fileIds={field.value}
              folder={folder}
              onChange={field.onChange}
              accept="image/*, application/pdf"
            />
          </InputGroup>
        )}
      />
    </form>
  )
}

export default BrandFilesForm
