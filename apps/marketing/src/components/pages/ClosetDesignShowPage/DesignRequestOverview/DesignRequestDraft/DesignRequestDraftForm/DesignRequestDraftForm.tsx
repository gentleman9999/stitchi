import { gql } from '@apollo/client'
import { InputGroup, TextField } from '@components/ui'
import { AdditionalInformationFormDesignRequestFragment } from '@generated/AdditionalInformationFormDesignRequestFragment'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import ReferenceFilesInput from '../../../ReferenceFilesInput/ReferenceFilesInput'
import DesignRequestLocationInput from './DesignRequestLocationInput'

const locationSchema = yup.object().shape({
  id: yup.string().nullable(),
  placement: yup.string().required().label('Placement'),
  description: yup.string().defined().label('Description'),
  fileIds: yup.array().of(yup.string().required()).required(),
})

const schema = yup.object().shape({
  useCase: yup.string().label('Use case'),
  referenceFileIds: yup
    .array()
    .of(yup.string().required())
    .required()
    .label('Reference files'),
  locations: yup.array().of(locationSchema).required(),
})

export type FormValues = yup.InferType<typeof schema>

interface Props {
  defaultValues?: Partial<FormValues>
  onSubmit: (data: FormValues) => Promise<void>
  fileFolder: string
  designRequest: AdditionalInformationFormDesignRequestFragment
}

const DesignRequestDraftForm = ({
  onSubmit,
  defaultValues,
  fileFolder,
  designRequest,
}: Props) => {
  const form = useForm<FormValues>({
    defaultValues: {
      useCase: defaultValues?.useCase || '',
      referenceFileIds: defaultValues?.referenceFileIds || [],
      locations: defaultValues?.locations || [],
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
    <form onSubmit={handleSubmit}>
      <ClosetSection>
        <Controller
          name="useCase"
          control={form.control}
          rules={{ onBlur: autoSave }}
          render={({ field, fieldState }) => (
            <InputGroup
              label="What will the merch be used for?"
              error={fieldState.error?.message}
            >
              <TextField
                {...field}
                placeholder="e.g. employee carepackage, charity event, concert merch..."
              />
            </InputGroup>
          )}
        />
      </ClosetSection>

      <ClosetSection>
        <ClosetSectionHeader>
          <ClosetSectionTitle title="Design locations" />
        </ClosetSectionHeader>
        <DesignRequestLocationInput form={form} autoSave={autoSave} />
      </ClosetSection>

      <ClosetSection>
        <ClosetSectionHeader>
          <ClosetSectionTitle title="Reference files" />
        </ClosetSectionHeader>
        <InputGroup
          optional
          label="Attach design files, logos, inspiration, etc..."
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
      </ClosetSection>
    </form>
  )
}

DesignRequestDraftForm.fragments = {
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

export default DesignRequestDraftForm
