import React from 'react'
import cx from 'classnames'

type InputElementAttributes = React.InputHTMLAttributes<HTMLInputElement>

interface BaseProps {
  className?: string
  label?: string
  description?: string
  error?: boolean
  inputClassName?: string
}

interface MultilineProps
  extends BaseProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  multiline: true
  inputRef?: React.Ref<any>
}

interface SinglelineProps extends BaseProps, InputElementAttributes {
  multiline?: false
  inputRef?: React.Ref<any>
}

export type TextFieldProps = MultilineProps | SinglelineProps

const TextField = (props: TextFieldProps) => {
  const className = cx(
    'block w-full shadow-sm sm:text-sm focus:ring-primary focus:border-primary border-gray-300 rounded-md disabled:text-gray-200',
    {
      'border-red-500 focus:border-red-500 focus:ring-red-500': props.error,
    },
    props.inputClassName,
  )

  const {
    description,
    className: containerClassName,
    label,
    error,
    inputClassName,
    inputRef,
    multiline,
    ...inputProps
  } = props

  return (
    <div className={containerClassName}>
      <div className="flex justify-between">
        {label && (
          <label
            htmlFor={props.name}
            className="block text-sm font-medium text-gray-700"
          >
            {`${label}${props.required ? '*' : ''}`}
          </label>
        )}

        {description && (
          <span
            id={`${props.name}-description`}
            className={cx('text-sm text-gray-500', {
              'text-red-500': error,
            })}
          >
            {description}
          </span>
        )}
      </div>

      <div className="">
        {multiline === true ? (
          <textarea
            {...(inputProps as MultilineProps)}
            ref={inputRef}
            rows={props.rows || 4}
            aria-describedby={props.description && `${props.name}-description`}
            className={className}
          />
        ) : (
          <input
            {...(inputProps as SinglelineProps)}
            ref={inputRef}
            type={props.type || 'text'}
            aria-describedby={props.description && `${props.name}-description`}
            className={className}
          />
        )}
      </div>
    </div>
  )
}

export default TextField
