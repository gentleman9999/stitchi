import React from 'react'
import TextField from '../TextField'

interface Props {
  value?: string | null
  onChange?: (value: string | null) => void
  minDate?: Date
  maxDate?: Date
}

const DateInput = (props: Props) => {
  return (
    <TextField
      className="w-full"
      type="date"
      value={props.value?.split('T')[0]}
      max={props.maxDate?.toISOString().split('T')[0]}
      min={props.minDate?.toISOString().split('T')[0]}
      onChange={e => {
        props.onChange?.(e.target.value)
      }}
    />
  )
}

export default DateInput
