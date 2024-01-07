import React from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'

interface Item {
  name: string
  label: string
  value: string
}

interface Props {
  items: Item[]
  value: string | undefined
  onValueChange: (value: string) => void
}

const RadioInput = ({ items, value, onValueChange }: Props) => (
  <RadioGroup.Root
    className="flex flex-col gap-4"
    value={value}
    onValueChange={onValueChange}
  >
    {items.map(item => (
      <RadioItem key={item.name} {...item} />
    ))}
  </RadioGroup.Root>
)

const RadioItem = ({ label, name, value }: Item) => {
  return (
    <div className="flex items-center px-6 border rounded-sm gap-4 cursor-pointer hover:bg-gray-50">
      <RadioGroup.Item
        className="bg-white w-5 h-5 rounded-full shadow-sm border"
        value={value}
        id={name}
      >
        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-3 after:h-3 after:bg-primary after:rounded-full" />
      </RadioGroup.Item>
      <label className="cursor-pointer text-lg py-4" htmlFor={name}>
        {label}
      </label>
    </div>
  )
}

export default RadioInput
