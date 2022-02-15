import React from 'react'
import cx from 'classnames'

type InputElementAttributes = React.InputHTMLAttributes<HTMLInputElement>

interface BaseProps {
  name: string
  className?: string
  label?: string
  description?: string
  autoComplete?: InputElementAttributes['autoComplete']
  type?: InputElementAttributes['type']
  required?: InputElementAttributes['required']
  readonly?: InputElementAttributes['readOnly']
  value?: string
  error?: boolean
  placeholder?: string
}

interface MultilineProps extends BaseProps {
  multiline: true
  inputRef?: React.Ref<any>
  minRows?: number
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

interface SinglelineProps extends BaseProps {
  multiline?: false
  inputRef?: React.Ref<any>
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export type TextFieldProps = MultilineProps | SinglelineProps

const TextField = (props: TextFieldProps) => {
  const { type = 'text' } = props

  const minRows = 'minRows' in props ? props.minRows : 4
  const className = cx(
    'block w-full shadow-sm sm:text-sm focus:ring-primary focus:border-primary border-gray-300 rounded-md',
    {
      'border-red-500 focus:border-red-500 focus:ring-red-500': props.error,
    },
  )

  return (
    <div className={props.className}>
      <div className="flex justify-between">
        {props.label && (
          <label
            htmlFor={props.name}
            className="block text-sm font-medium text-gray-700"
          >
            {`${props.label}${props.required ? '*' : ''}`}
          </label>
        )}

        {props.description && (
          <span
            id={`${props.name}-description`}
            className={cx('text-sm text-gray-500', {
              'text-red-500': props.error,
            })}
          >
            {props.description}
          </span>
        )}
      </div>

      <div className="mt-1">
        {props.multiline === true ? (
          <textarea
            id={props.name}
            ref={props.inputRef}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            defaultValue={''}
            rows={minRows}
            aria-describedby={props.description && `${props.name}-description`}
            className={className}
          />
        ) : (
          <input
            id={props.name}
            ref={props.inputRef}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            type={type}
            autoComplete={props.autoComplete}
            required={props.required}
            readOnly={props.readonly}
            aria-describedby={props.description && `${props.name}-description`}
            className={className}
          />
        )}
      </div>
    </div>
  )
}

export default TextField
