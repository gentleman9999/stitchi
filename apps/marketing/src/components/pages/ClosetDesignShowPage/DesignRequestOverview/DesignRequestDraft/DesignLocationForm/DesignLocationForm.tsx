import { InputGroup, TextField } from '@components/ui'
import React from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ReferenceFilesInput from '../../../ReferenceFilesInput/ReferenceFilesInput'
import useDesignLocationForm from './useDesignLocationForm'
import { gql } from '@apollo/client'
import { DesignLocationFormDesignLocationFragment } from '@generated/DesignLocationFormDesignLocationFragment'

const schema = yup.object().shape({
  id: yup.string().optional().defined(),
  placement: yup.string().required().label('Placement'),
  description: yup.string().defined().label('Description'),
  fileIds: yup.array().of(yup.string().required()).required(),
})

export type FormValues = yup.InferType<typeof schema>

const locations = [
  'Front',
  'Back',
  'Pocket',
  'Left Sleeve',
  'Right Sleeve',
  'Other',
]

export interface Props {
  fileFolder: string
  designRequestId: string
  designLocation?: DesignLocationFormDesignLocationFragment
  onSubmit: () => void
  renderContainer?: (props: {
    children: React.ReactNode
    loading: boolean
    onSubmit: () => void
  }) => React.ReactNode
}

const DesignLocationForm = (props: Props) => {
  const { handleLocationChange, loading } = useDesignLocationForm({
    designRequestId: props.designRequestId,
  })

  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      placement: props.designLocation?.placement || '',
      description: props.designLocation?.description || '',
      fileIds: props.designLocation?.fileIds || [],
      id: props.designLocation?.id || undefined,
    },
  })

  const { setFocus } = form

  React.useEffect(() => {
    setFocus('description')
  }, [setFocus])

  const handleSubmit = form.handleSubmit(async data => {
    await handleLocationChange({
      designRequestDesignLocationId: data.id,
      fileIds: data.fileIds,
      description: data.description,
      placement: data.placement,
    })

    props.onSubmit()
  })

  const renderContainer =
    props.renderContainer ?? (props => <>{props.children}</>)

  return (
    <form onSubmit={handleSubmit}>
      <input hidden readOnly {...form.register('id')} />

      {renderContainer({
        loading,
        onSubmit: handleSubmit,
        children: (
          <div className="flex flex-col gap-8">
            <Controller
              name="placement"
              control={form.control}
              defaultValue={locations[0]}
              render={({ field, fieldState }) => (
                <InputGroup
                  label="Where should this design be placed?"
                  error={fieldState.error?.message}
                >
                  <RadioGroup.Root
                    {...field}
                    className="inline-flex gap-3 py-1 flex-wrap"
                    onValueChange={field.onChange}
                  >
                    {locations.map(location => (
                      <RadioGroup.Item
                        key={location}
                        value={location}
                        className="py-2 px-4 rounded-md border text-sm font-semibold outline-gray-700 data-[state=checked]:outline outline-offset-2 data-[state=checked]:border-gray-700 data-[state=checked]:bg-gray-700 data-[state=checked]:text-white"
                      >
                        {location}
                      </RadioGroup.Item>
                    ))}
                  </RadioGroup.Root>
                </InputGroup>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <InputGroup
                  label="Describe your design"
                  error={fieldState.error?.message}
                >
                  <TextField
                    {...field}
                    multiline
                    placeholder="Be descriptive..."
                  />
                </InputGroup>
              )}
            />

            <InputGroup
              optional
              label={
                <>
                  Add reference images{' '}
                  <span className="text-gray-400">
                    (design files, logos, inspiration, etc...)
                  </span>
                </>
              }
            >
              <Controller
                name="fileIds"
                control={form.control}
                render={({ field }) => (
                  <ReferenceFilesInput
                    keepUploadStatus
                    folder={props.fileFolder}
                    value={field.value}
                    onChange={field.onChange}
                    referenceFiles={
                      props.designLocation?.files.map(file => ({
                        ...file,
                        bytes: file.humanizedBytes,
                      })) || []
                    }
                  />
                )}
              />
            </InputGroup>
          </div>
        ),
      })}
    </form>
  )
}

DesignLocationForm.fragments = {
  designLocation: gql`
    fragment DesignLocationFormDesignLocationFragment on DesignRequestDesignLocation {
      id
      placement
      description
      fileIds
      files {
        id
        humanizedBytes
        fileType
        url
        name
      }
    }
  `,
}

export default DesignLocationForm
