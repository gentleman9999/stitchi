import React from 'react'

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
}

interface MultilineProps extends BaseProps {
  multiline: true
  inputRef?: React.Ref<any>
  minRows?: number
}

interface SinglelineProps extends BaseProps {
  multiline?: false
  inputRef?: React.Ref<any>
}

export type TextFieldProps = MultilineProps | SinglelineProps

const TextField = (props: TextFieldProps) => {
  const { type = 'text' } = props

  const minRows = 'minRows' in props ? props.minRows : 4

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
            className="text-sm text-gray-500"
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
            defaultValue={''}
            rows={minRows}
            aria-describedby={props.description && `${props.name}-description`}
            className="block w-full shadow-sm sm:text-sm focus:ring-primary focus:border-primary border border-gray-300 rounded-md"
          />
        ) : (
          <input
            id={props.name}
            ref={props.inputRef}
            name={props.name}
            type={type}
            autoComplete={props.autoComplete}
            required={props.required}
            readOnly={props.readonly}
            aria-describedby={props.description && `${props.name}-description`}
            className="block w-full shadow-sm sm:text-sm focus:ring-primary focus:border-primary border-gray-300 rounded-md"
          />
        )}
      </div>
    </div>
  )
}

export default TextField
