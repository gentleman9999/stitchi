import { ExclamationCircle } from 'icons'
import React from 'react'

interface Props {
  children: React.ReactNode
  label?: React.ReactNode
  error?: String
  helperText?: String
  optional?: boolean
}

const InputGroup = ({
  children,
  error,
  helperText,
  label,
  optional,
}: Props) => {
  return (
    <div>
      <div className="flex justify-between">
        {label && (
          <label
            htmlFor={typeof label === 'string' ? label : undefined}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {label}
          </label>
        )}
        {optional ? (
          <span className="text-sm leading-6 text-gray-500" id="email-optional">
            Optional
          </span>
        ) : null}
      </div>

      <div className="relative mt-2">
        {children}

        {error ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircle
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        ) : null}
      </div>

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      {!error && helperText ? (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      ) : null}
    </div>
  )
}

export default InputGroup
