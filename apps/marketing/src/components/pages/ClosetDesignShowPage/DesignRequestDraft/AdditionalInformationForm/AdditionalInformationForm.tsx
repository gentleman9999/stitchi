import { gql } from '@apollo/client'
import { InputGroup, TextField } from '@components/ui'
import { AdditionalInformationFormDesignRequestFragment } from '@generated/AdditionalInformationFormDesignRequestFragment'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import ReferenceFilePreview from '../../ReferenceFilePreview'
import ReferenceFilesInput from '../DesignLocationForm/ReferenceFilesInput'

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

const AdditionalInformationForm = ({
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
          <div className="flex flex-col gap-8">
            <ReferenceFilesInput
              form={form}
              folder={fileFolder}
              fieldName="referenceFileIds"
            />

            <ReferenceFilePreview
              visibleFileIds={values.referenceFileIds}
              designRequest={designRequest}
              onDelete={id => {
                form.setValue(
                  'referenceFileIds',
                  form
                    .getValues('referenceFileIds')
                    .filter(value => value !== id),
                  { shouldDirty: true },
                )
              }}
            />
          </div>
        </InputGroup>
      </div>
    </form>
  )
}

AdditionalInformationForm.fragments = {
  designRequest: gql`
    ${ReferenceFilePreview.fragments.designRequest}
    fragment AdditionalInformationFormDesignRequestFragment on DesignRequest {
      id
      ...ReferenceFilePreviewDesignRequestFragment
    }
  `,
}

export default AdditionalInformationForm
