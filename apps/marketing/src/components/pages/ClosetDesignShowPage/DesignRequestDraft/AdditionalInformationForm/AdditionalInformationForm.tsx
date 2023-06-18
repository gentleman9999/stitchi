import { InputGroup, TextField } from '@components/ui'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import ReferenceFilesInput from '../DesignLocationForm/ReferenceFilesInput'

const schema = yup.object().shape({
  description: yup.string().required().label('Description'),
  useCase: yup.string().label('Use case'),
  referenceFiles: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          type: yup.string().required(),
          url: yup.string().required(),
        })
        .required(),
    )
    .required()
    .label('Reference files'),
})

type FormValues = yup.InferType<typeof schema>

interface Props {
  defaultValues?: Partial<FormValues>
  onSubmit: (data: FormValues) => void
}

const AdditionalInformationForm = ({ onSubmit, defaultValues }: Props) => {
  const form = useForm<FormValues>({
    defaultValues: {
      description: defaultValues?.description || '',
      useCase: defaultValues?.useCase || '',
      referenceFiles: defaultValues?.referenceFiles || [],
    },
    resolver: yupResolver(schema),
  })

  const { trigger, formState } = form

  const values = form.watch()

  const handleSubmit = form.handleSubmit(async data => {})

  const autoSave = async () => {
    if (Object.keys(formState.dirtyFields).length && (await trigger())) {
      // This is where you'd normally make an API call to save the data
      onSubmit(values)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold leading-7">Overview</h2>

      <div className="mt-6 grid grid-cols-1 gap-y-8">
        <Controller
          name="description"
          control={form.control}
          rules={{ onBlur: autoSave }}
          render={({ field, fieldState }) => (
            <InputGroup
              label="Describe your vision"
              error={fieldState.error?.message}
            >
              <TextField multiline {...field} />
            </InputGroup>
          )}
        />

        <Controller
          name="useCase"
          control={form.control}
          rules={{ onBlur: autoSave }}
          render={({ field, fieldState }) => (
            <InputGroup
              label="What will this be used for?"
              error={fieldState.error?.message}
            >
              <TextField {...field} />
            </InputGroup>
          )}
        />

        <InputGroup
          optional
          label={
            <>
              Additional reference files{' '}
              <span className="text-gray-400">
                (design files, logos, inspiration, etc...)
              </span>
            </>
          }
        >
          <ReferenceFilesInput form={form} fieldName="referenceFiles" />
        </InputGroup>
      </div>
    </form>
  )
}

export default AdditionalInformationForm
