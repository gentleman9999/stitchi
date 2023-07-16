import { Checkbox, InputGroup, LinkInline, TextField } from '@components/ui'
import { yupResolver } from '@hookform/resolvers/yup'
import routes from '@lib/routes'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().optional(),
  termsConditionsAgreed: yup
    .boolean()
    .oneOf([true], 'You must approve this design to continue')
    .required(),
})

export type FormValues = yup.InferType<typeof schema>

interface Props {
  initialValues?: Partial<FormValues>
  onSubmit: (values: FormValues) => void | Promise<void>
  renderContainer: (props: {
    children: React.ReactNode
    onSubmit: () => Promise<void>
    loading: boolean
  }) => React.ReactNode
}

const CreateDesignForm = ({
  initialValues,
  onSubmit,
  renderContainer,
}: Props) => {
  const [loading, setLoading] = React.useState(false)
  const form = useForm<FormValues>({
    defaultValues: {
      termsConditionsAgreed: false,
      description: '',
      name: '',
      ...initialValues,
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = form.handleSubmit(async data => {
    setLoading(true)
    try {
      await onSubmit(data)
    } finally {
      setLoading(false)
    }
  })

  return (
    <form>
      {renderContainer({
        onSubmit: handleSubmit,
        loading,
        children: (
          <div className="flex flex-col gap-10">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <InputGroup
                  label="Product name"
                  error={fieldState.error?.message}
                >
                  <TextField
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                    name={field.name}
                  />
                </InputGroup>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <InputGroup
                  label="Product description"
                  error={fieldState.error?.message}
                  optional
                >
                  <TextField
                    multiline
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                    name={field.name}
                  />
                </InputGroup>
              )}
            />

            <Controller
              name="termsConditionsAgreed"
              control={form.control}
              render={({ field, fieldState }) => (
                <InputGroup
                  label="Terms & Conditions"
                  error={fieldState.error?.message}
                >
                  <p className="text-xs leading-1 text-gray-700">
                    By approving this design, you affirm that you possess the
                    necessary legal rights to use every component and asset
                    incorporated in the design. You also affirm that you have
                    read and agree to our{' '}
                    <LinkInline
                      href={routes.internal.legal.terms.href()}
                      external
                    >
                      terms of service
                    </LinkInline>
                    .
                  </p>
                  <br />
                  <Checkbox
                    size={1}
                    label="I approve this design"
                    name={field.name}
                    checked={field.value}
                    onChange={field.onChange}
                    value="termsConditionsAgreed"
                  />
                </InputGroup>
              )}
            />
          </div>
        ),
      })}
    </form>
  )
}

export default CreateDesignForm
