import React from 'react'
import TextField from '../TextField'

interface Props {
  value?: string
  onChange?: (value: string) => void
  disableFutureDates?: boolean
  disablePastDates?: boolean
}

const DateInput = (props: Props) => {
  return (
    <TextField
      type="date"
      value={props.value}
      onChange={e => {
        props.onChange?.(e.target.value)
      }}
      max={
        props.disableFutureDates
          ? new Date().toISOString().split('T')[0]
          : undefined
      }
      min={
        props.disablePastDates
          ? new Date().toISOString().split('T')[0]
          : undefined
      }
    />
  )
}

export default DateInput
