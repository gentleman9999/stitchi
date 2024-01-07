import React from 'react'
import * as RuiSelect from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'icons'
import cx from 'classnames'

interface Option<T extends string> {
  value: T
  label: string
}

interface Props<T extends string> {
  value?: T
  options: Option<T>[]
  placeholder?: string
  onChange?: (value: T) => void
  inputRef?: React.Ref<HTMLInputElement>
}

// eslint-disable-next-line react/function-component-definition
function Select<T extends string>({
  options,
  placeholder,
  value,
  onChange,
  inputRef,
}: Props<T>) {
  return (
    <RuiSelect.Root value={value} onValueChange={onChange}>
      <RuiSelect.Trigger className="inline-flex items-center justify-between border px-3 py-2 gap-2 rounded-sm text-sm font-medium hover:bg-gray-50 focus:shadow w-full">
        <RuiSelect.Value placeholder={placeholder} ref={inputRef} />
        <RuiSelect.Icon className="">
          <ChevronDown className="w-4 h-4" />
        </RuiSelect.Icon>
      </RuiSelect.Trigger>
      <RuiSelect.Portal>
        <RuiSelect.Content className="overflow-hidden bg-white rounded-sm shadow-magical">
          <RuiSelect.ScrollUpButton className="flex items-center justify-center bg-white">
            <ChevronUp />
          </RuiSelect.ScrollUpButton>
          <RuiSelect.Viewport className="p-2">
            <RuiSelect.Group>
              {options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </RuiSelect.Group>
          </RuiSelect.Viewport>
          <RuiSelect.ScrollDownButton className="flex items-center justify-center bg-white">
            <ChevronDown />
          </RuiSelect.ScrollDownButton>
        </RuiSelect.Content>
      </RuiSelect.Portal>
    </RuiSelect.Root>
  )
}

const SelectItem = React.forwardRef<
  any,
  {
    children: React.ReactNode
    value: string
    disabled?: boolean
    className?: string
  }
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <RuiSelect.Item
      className={cx(
        'text-sm rounded-sm flex items-center relative select-none ring-2 ring-transparent hover:ring-primary transition-all data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-gray-50 cursor-pointer py-1 pr-1 pl-7',
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      <RuiSelect.ItemText>{children}</RuiSelect.ItemText>
      <RuiSelect.ItemIndicator className="absolute left-0 w-8 inline-flex items-center justify-center">
        <Check className="w-3 h-3 stroke-2" />
      </RuiSelect.ItemIndicator>
    </RuiSelect.Item>
  )
})

SelectItem.displayName = 'SelectItem'

export default Select
