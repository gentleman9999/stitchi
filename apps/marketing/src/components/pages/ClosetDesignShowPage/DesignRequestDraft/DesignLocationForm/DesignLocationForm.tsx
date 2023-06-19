import { InputGroup, TextField } from '@components/ui'
import React from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ReferenceFilesInput from './ReferenceFilesInput'

const schema = yup.object().shape({
  placement: yup.string().required(),
  description: yup.string().required(),
  referenceFileIds: yup.array().of(yup.string().required()).required(),
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
  onSubmit: (data: FormValues) => void
  defaultValues?: Partial<FormValues>
  renderContainer?: (props: {
    children: React.ReactNode
    onSubmit: () => void
  }) => React.ReactNode
}

const DesignLocationForm = (props: Props) => {
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  })

  const { setFocus } = form

  React.useEffect(() => {
    setFocus('description')
  }, [setFocus])

  const handleSubmit = form.handleSubmit(data => {
    props.onSubmit(data)
  })

  const renderContainer =
    props.renderContainer ?? (props => <>{props.children}</>)

  return (
    <form onSubmit={handleSubmit}>
      {renderContainer({
        onSubmit: handleSubmit,
        children: (
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-semibold leading-loose">
              Add design location
            </h2>

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
              <ReferenceFilesInput
                form={form}
                folder={props.fileFolder}
                fieldName="referenceFileIds"
              />
            </InputGroup>
          </div>
        ),
      })}
    </form>
  )
}

export default DesignLocationForm
