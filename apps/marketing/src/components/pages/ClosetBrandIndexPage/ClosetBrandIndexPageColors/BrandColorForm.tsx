import FormSection from '@components/pages/ClosetDesignBuyPage/FormSection'
import { InputGroup, TextField } from '@components/ui'
import Button from '@components/ui/ButtonV2/Button'
import { Card, CardContent } from '@components/ui/Card'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { yupResolver } from '@hookform/resolvers/yup'
import Color from 'color'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const inputClassName = '!text-xs p-1'

const cmykInputClassName = '!text-xs p-1 !w-10'

function getRandomColor() {
  const randomChannel = () => Math.floor(Math.random() * 256)
  return Color.rgb(randomChannel(), randomChannel(), randomChannel())
}
const defaultColor = getRandomColor()

const [default_cmyk_c, default_cmyk_m, default_cmyk_y, default_cmyk_k] =
  defaultColor.cmyk().round().array()

const schema = yup.object().shape({
  id: yup.string().nullable().defined().label('ID'),
  organizationId: yup.string().required().label('Organization ID'),
  hex: yup.string().nullable().required().label('Hex'),
  name: yup.string().nullable().required().label('Name'),
  pantone: yup.string().nullable().defined().label('Pantone'),
  cmyk_c: yup.number().integer().min(0).max(100).required().label('C'),
  cmyk_m: yup.number().integer().min(0).max(100).required().label('M'),
  cmyk_y: yup.number().integer().min(0).max(100).required().label('Y'),
  cmyk_k: yup.number().integer().min(0).max(100).required().label('K'),
})

export type FormValues = yup.InferType<typeof schema>

interface Props {
  initialValues?: Partial<FormValues>
  onSubmit: (values: FormValues) => void | Promise<void>
  onClose: () => void
}

const BrandColorForm = (props: Props) => {
  const [submitting, setSubmitting] = React.useState(false)
  const form = useForm<FormValues>({
    defaultValues: {
      id: null,

      // TODO: Implement pantone support
      pantone: null,
      name: 'New color',
      hex: defaultColor.hex(),
      cmyk_c: default_cmyk_c,
      cmyk_k: default_cmyk_k,
      cmyk_m: default_cmyk_m,
      cmyk_y: default_cmyk_y,
      ...props.initialValues,
    },
    resolver: yupResolver(schema),
    mode: 'onTouched',
  })

  const { setValue } = form

  const { hex, cmyk_c, cmyk_k, cmyk_m, cmyk_y } = form.watch()

  const handleSubmit = form.handleSubmit(async values => {
    setSubmitting(true)

    try {
      await props.onSubmit(values)
    } finally {
      setSubmitting(false)
    }
  })

  const handleHexBlur = () => {
    if (hex) {
      let color

      try {
        color = Color(hex)
      } catch {
        return
      }

      const [c, m, y, k] = color.cmyk().round().array()

      setValue('cmyk_c', c)
      setValue('cmyk_m', m)
      setValue('cmyk_y', y)
      setValue('cmyk_k', k)
    }
  }

  const handleCmykBlur = () => {
    let color

    try {
      color = color = Color({
        c: cmyk_c,
        m: cmyk_m,
        y: cmyk_y,
        k: cmyk_k,
      })
        .cmyk()
        .round()
    } catch {
      return
    }

    setValue('hex', color.hex())
  }

  return (
    <form onSubmit={handleSubmit}>
      <input readOnly type="hidden" {...form.register('id')} />
      <input readOnly type="hidden" {...form.register('organizationId')} />
      <input readOnly type="hidden" {...form.register('pantone')} />
      <Card className="relative">
        <div className="absolute top-2 right-2">
          <button
            type="button"
            onClick={props.onClose}
            className="flex justify-center items-center p-2 bg-gray-900/60 hover:bg-gray-900/70 transition-all rounded-md"
          >
            <XMarkIcon className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="w-full h-28" style={{ backgroundColor: hex }} />
        <CardContent dense>
          <FormSection>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <InputGroup error={fieldState.error?.message}>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium w-10">Name</span>
                    <TextField
                      inputClassName={inputClassName}
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      inputRef={field.ref}
                      value={field.value}
                    />
                  </div>
                </InputGroup>
              )}
            />

            <Controller
              name="hex"
              control={form.control}
              rules={{
                onBlur: handleHexBlur,
              }}
              render={({ field, fieldState }) => (
                <InputGroup error={fieldState.error?.message}>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium w-10">Hex</span>
                    <TextField
                      inputClassName="!text-xs p-1"
                      name={field.name}
                      onBlur={field.onBlur}
                      maxLength={7}
                      onChange={e => {
                        let value = e.target.value

                        if (value.length > 0 && value.charAt(0) !== '#') {
                          value = `#${value}`
                        }

                        field.onChange(value)
                      }}
                      inputRef={field.ref}
                      value={field.value}
                    />
                  </div>
                </InputGroup>
              )}
            />

            <InputGroup
              error={
                form.formState.errors.cmyk_c?.message ||
                form.formState.errors.cmyk_m?.message ||
                form.formState.errors.cmyk_y?.message ||
                form.formState.errors.cmyk_k?.message
              }
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium w-10">CMYK</span>

                <div className="flex gap-1">
                  <Controller
                    name="cmyk_c"
                    control={form.control}
                    rules={{
                      onBlur: handleCmykBlur,
                    }}
                    render={({ field }) => (
                      <TextField
                        inputClassName={cmykInputClassName}
                        name={field.name}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        inputRef={field.ref}
                        maxLength={3}
                      />
                    )}
                  />
                  <Controller
                    name="cmyk_m"
                    control={form.control}
                    rules={{
                      onBlur: handleCmykBlur,
                    }}
                    render={({ field }) => (
                      <TextField
                        inputClassName={cmykInputClassName}
                        name={field.name}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        inputRef={field.ref}
                        maxLength={3}
                      />
                    )}
                  />
                  <Controller
                    name="cmyk_y"
                    control={form.control}
                    rules={{
                      onBlur: handleCmykBlur,
                    }}
                    render={({ field }) => (
                      <TextField
                        inputClassName={cmykInputClassName}
                        name={field.name}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        inputRef={field.ref}
                        maxLength={3}
                      />
                    )}
                  />
                  <Controller
                    name="cmyk_k"
                    control={form.control}
                    rules={{
                      onBlur: handleCmykBlur,
                    }}
                    render={({ field }) => (
                      <TextField
                        inputClassName={cmykInputClassName}
                        name={field.name}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        inputRef={field.ref}
                        maxLength={3}
                      />
                    )}
                  />
                </div>
              </div>
            </InputGroup>

            <InputGroup>
              <Button
                className="w-full"
                type="submit"
                loading={submitting}
                variant="ghost"
              >
                Save
              </Button>
            </InputGroup>
          </FormSection>
        </CardContent>
      </Card>
    </form>
  )
}

export default BrandColorForm
