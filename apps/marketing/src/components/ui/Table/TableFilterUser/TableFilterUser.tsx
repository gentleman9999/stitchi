import React from 'react'
import TableFilter from '../TableFilter'
import UserFilter, { Props as UserFilterProps } from './UserFilter'

export interface Props {
  value: UserFilterProps['value']
  label?: string
  users: UserFilterProps['users']
  onChange: UserFilterProps['onChange']
}

const TableFilterUser = ({
  label = 'Owner',
  value,
  onChange,
  users,
}: Props) => {
  return (
    <TableFilter
      label={label}
      value={value}
      onRemove={() => onChange(null)}
      renderFilter={({ onClose }) => (
        <UserFilter
          label={label}
          users={users}
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
