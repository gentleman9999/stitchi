import React from 'react'
import TableFilter from '../TableFilter'
import UserFilter, { UserId } from './UserFilter'

export interface Props {
  value: UserId | null
  label?: string
  onChange: (value: UserId | null) => Promise<void> | void
}

const TableFilterUser = ({ label = 'Owner', value, onChange }: Props) => {
  return (
    <TableFilter
      label={label}
      value={value}
      onRemove={() => onChange(null)}
      renderFilter={({ onClose }) => (
        <UserFilter
          value={value}
          onChange={v => {
            onChange(v)
            onClose()
          }}
        />
      )}
    />
  )
}

export default TableFilterUser
