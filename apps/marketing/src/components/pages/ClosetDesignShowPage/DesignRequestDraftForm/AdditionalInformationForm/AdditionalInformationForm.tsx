import { InputGroup, TextField } from '@components/ui'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import ReferenceFilesInput from '../DesignLocationForm/ReferenceFilesInput'

const schema = yup.object().shape({
  description: yup.string().required(),
  useCase: yup.string().required(),
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
    .required(),
})

type FormValues = yup.InferType<typeof schema>

interface Props {
  defaultValues?: Partial<FormValues>
  onSubmit: (data: FormValues) => void
}

const AdditionalInformationForm = ({ onSubmit, defaultValues }: Props) => {
  const form = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  })

  const handleSubmit = form.handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold leading-loose">Overview</h2>
      <InputGroup label="Describe your vision">
        <TextField multiline />
      </InputGroup>

      <InputGroup label="What will this be used for?">
        <TextField />
      </InputGroup>

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
    </form>
  )
}

export default AdditionalInformationForm
