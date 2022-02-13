import React from 'react'

interface Option {
  id: string
  label: string
  value: string | number
}

export interface RadioSelectProps {
  name: string
  options: Option[]
  label?: string
  inputRef?: React.Ref<any>
}

const RadioSelect = (props: RadioSelectProps) => {
  return (
    <fieldset className="sm:col-span-2">
      <legend className="block text-sm font-medium text-gray-700">
        {props.label}
      </legend>
      <div className="mt-4 grid grid-cols-1 gap-y-4">
        {props.options.map(option => (
          <div key={option.id} className="flex items-center">
            <input
              id={option.id}
              ref={props.inputRef}
              name={props.name}
              defaultValue={option.value}
              type="radio"
              className="focus:ring-primary h-4 w-4 text-brand-primary border-gray-300"
            />
            <label htmlFor={option.id} className="ml-3">
              <span className="block text-sm text-gray-700">
                {option.label}
              </span>
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  )
}

export default RadioSelect
