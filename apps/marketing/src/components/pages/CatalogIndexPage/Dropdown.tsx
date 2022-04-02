import React from 'react'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Check, ChevronDown } from 'icons'
import cx from 'classnames'

interface DropdownOption<T extends any> {
  label: string
  value: T
}

interface Props<T extends any> {
  options: DropdownOption<T>[]
  value: DropdownOption<T> | null
  onChange: (option: DropdownOption<T>) => void
  placeholder?: string
  fullWidth?: boolean
}

const Dropdown = <T extends any>({
  options,
  placeholder,
  value,
  onChange,
  fullWidth,
}: Props<T>) => {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">Change product type</Listbox.Label>
          <div className="relative">
            <div
              className={cx(
                'inline-flex shadow-sm rounded-md divide-x divide-primaryAlt-600',
                { 'w-full': fullWidth === true },
              )}
            >
              <div
                className={cx(
                  'relative z-0 inline-flex shadow-sm rounded-md divide-x divide-primaryAlt-600',
                  { 'w-full': fullWidth === true },
                )}
              >
                <Listbox.Button
                  className={cx(
                    'relative inline-flex items-center bg-primaryAlt-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white',
                    { 'w-full': fullWidth === true },
                  )}
                >
                  <Check className="h-5 w-5" aria-hidden="true" />
                  <p className="ml-2.5 text-sm font-medium">
                    {value?.label || placeholder}
                  </p>
                </Listbox.Button>
                <Listbox.Button className="relative inline-flex items-center bg-primaryAlt-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-primaryAlt-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primaryAlt-500">
                  <span className="sr-only">Change product type</span>
                  <ChevronDown
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </Listbox.Button>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {options.map(option => (
                  <Listbox.Option key={option.label} value={option}>
                    {({ active }) => (
                      <span
                        className={cx(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        )}
                      >
                        {option.label}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default Dropdown
