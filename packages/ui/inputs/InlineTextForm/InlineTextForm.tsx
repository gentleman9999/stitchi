import React from 'react'
import cx from 'classnames'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '../..'

type InputElementAttributes = React.InputHTMLAttributes<HTMLInputElement>

export interface InlineTextFormProps<T extends string> {
  name: T
  action: {
    label?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  }
  type?: InputElementAttributes['type']
  className?: string
  autoComplete?: InputElementAttributes['autoComplete']
  placeholder?: InputElementAttributes['placeholder']
  validation?: yup.StringSchema
  centered?: boolean
}

// eslint-disable-next-line react/function-component-definition
function InlineTextForm<T extends string>(props: InlineTextFormProps<T>) {
  const schema = yup.object({
    [props.name]: props.validation ? props.validation : yup.string().required(),
  })

  const form = useForm({
    resolver: yupResolver(schema),
  })

  const { formState } = form

  const handleSubmit = form.handleSubmit(async data => {})

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
            <Button type="submit">{props.action.label || 'Submit'}</Button>
          </div>
        </div>

        <span className="text-red-500 text-sm">
          {formState.errors[props.name]?.message}
        </span>
      </div>
    </form>
  )
}

export default InlineTextForm
