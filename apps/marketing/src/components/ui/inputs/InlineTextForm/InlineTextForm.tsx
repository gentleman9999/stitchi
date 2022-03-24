import React from 'react'
import cx from 'classnames'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '../..'

type InputElementAttributes = React.InputHTMLAttributes<HTMLInputElement>

export interface InlineTextFormProps<T extends string> {
  name: T
  onSubmit: (data: Record<T, string>) => Promise<void>
  actionLabel: string
  type?: InputElementAttributes['type']
  className?: string
  autoComplete?: InputElementAttributes['autoComplete']
  placeholder?: InputElementAttributes['placeholder']
  validation?: yup.StringSchema
  centered?: boolean
  defaultValue?: string
  variant?: 'primary' | 'secondary'
}

// eslint-disable-next-line react/function-component-definition
function InlineTextForm<T extends string>(props: InlineTextFormProps<T>) {
  const [loading, setLoading] = React.useState(false)
  const [submitError, setSubmitError] = React.useState('')
  const schema = yup.object({
    [props.name]: props.validation ? props.validation : yup.string().required(),
  })

  const form = useForm({
    defaultValues: {
      [props.name]: props.defaultValue ?? '',
    },
    resolver: yupResolver(schema),
  })

  const { formState } = form

  const handleSubmit = form.handleSubmit(async data => {
    setSubmitError('')
    setLoading(true)
    try {
      await props.onSubmit(data as any)
    } catch (e) {
      console.error(e)
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  })

  return (
    <form onSubmit={handleSubmit} className={cx(props.className)}>
      <label htmlFor={props.name} className="sr-only">
        {props.name}
      </label>

      <div
        className={cx('sm:max-w-md', {
          'm-auto': props.centered,
        })}
      >
        <div className="sm:flex">
          <input
            required
            {...form.register(props.name)}
            name={props.name}
            id={props.name}
            autoComplete={props.autoComplete}
            placeholder={props.placeholder}
            className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400"
          />
          <div className="mt-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <Button
              type="submit"
              loading={loading}
              color={props.variant === 'primary' ? 'brandPrimary' : 'primary'}
            >
              {props.actionLabel || 'Submit'}
            </Button>
          </div>
        </div>

        <span className="text-red-500 text-sm">
          {formState.errors[props.name]?.message}
        </span>
        <span className="text-red-500 text-sm">{submitError}</span>
      </div>
    </form>
  )
}

export default InlineTextForm
