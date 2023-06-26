import { gql } from '@apollo/client'
import { InputGroup, TextField } from '@components/ui'
import { AdditionalInformationFormDesignRequestFragment } from '@generated/AdditionalInformationFormDesignRequestFragment'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import ReferenceFilesInput from '../../../ReferenceFilesInput/ReferenceFilesInput'

const schema = yup.object().shape({
  description: yup.string().required().label('Description'),
  useCase: yup.string().label('Use case'),
  referenceFileIds: yup
    .array()
    .of(yup.string().required())
    .required()
    .label('Reference files'),
})

type FormValues = yup.InferType<typeof schema>

interface Props {
  defaultValues?: Partial<FormValues>
  onSubmit: (data: FormValues) => Promise<void>
  fileFolder: string
  designRequest: AdditionalInformationFormDesignRequestFragment
}

const GeneralInformation = ({
  onSubmit,
  defaultValues,
  fileFolder,
  designRequest,
}: Props) => {
  const form = useForm<FormValues>({
    defaultValues: {
      description: defaultValues?.description || '',
      useCase: defaultValues?.useCase || '',
      referenceFileIds: defaultValues?.referenceFileIds || [],
    },
    resolver: yupResolver(schema),
  })

  const { trigger, formState, reset } = form

  const values = form.watch()

  const handleSubmit = form.handleSubmit(async data => {})

  const referenceFileIdsDirty = formState.dirtyFields.referenceFileIds

  React.useEffect(() => {
    const submit = async () => {
      if (referenceFileIdsDirty && (await trigger('referenceFileIds'))) {
        reset(undefined, { keepValues: true })
        onSubmit(values)
      }
    }

    submit()
  }, [referenceFileIdsDirty, onSubmit, trigger, values, reset])

  const autoSave = async () => {
    const { referenceFileIds, ...dirtyFields } = formState.dirtyFields
    if (Object.keys(dirtyFields).length && (await trigger())) {
      reset(undefined, { keepValues: true })
      onSubmit(values)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-12">
      <Controller
        name="description"
        control={form.control}
        rules={{ onBlur: autoSave }}
        render={({ field, fieldState }) => (
          <InputGroup
            label="Describe your vision"
            helperText="Provide detailed information in your description. The more specific you are, the more accurately we can bring your design vision to life."
            error={fieldState.error?.message}
          >
            <TextField
              multiline
              {...field}
              placeholder='e.g. "Design for a t-shirt for our tech conference, with logo, `TechFest 2023`, futuristic theme, in blue and white."'
            />
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
            <TextField
              {...field}
              placeholder="e.g. band merch, employee carepackage, charity event"
            />
          </InputGroup>
        )}
      />

      <InputGroup
        optional
        label={
          <>
            Reference files{' '}
            <span className="text-gray-400">
              (design files, logos, inspiration, etc...)
            </span>
          </>
        }
      >
        <Controller
          name="referenceFileIds"
          control={form.control}
          render={({ field }) => (
            <ReferenceFilesInput
              value={field.value}
              onChange={field.onChange}
              folder={fileFolder}
              referenceFiles={designRequest.files.map(file => ({
                ...file,
                bytes: file.humanizedBytes,
              }))}
            />
          )}
        />
      </InputGroup>
    </form>
  )
}

GeneralInformation.fragments = {
  designRequest: gql`
    fragment AdditionalInformationFormDesignRequestFragment on DesignRequest {
      id
      files {
        id
        humanizedBytes
        name
        url
        fileType

        ... on FileImage {
          width
          height
        }
      }
    }
  `,
}

export default GeneralInformation
