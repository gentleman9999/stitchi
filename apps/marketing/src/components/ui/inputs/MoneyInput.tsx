import React from 'react'
import TextField, { SinglelineProps } from './TextField'
import currency from 'currency.js'

interface Props
  extends Omit<SinglelineProps, 'type' | 'value' | 'onChange' | 'multiline'> {
  value: number
  onChange: (value: number) => void
}

const MoneyInput = ({ value, onChange, ...rest }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = currency(e.target.value).intValue
    onChange(value)
  }

  return (
    <TextField
      type="text"
      value={currency(value, { fromCents: true }).format()}
      onChange={handleChange}
      {...rest}
    />
  )
}

export default MoneyInput
