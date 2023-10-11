import { isSameDay, parseISO } from 'date-fns'
import React from 'react'
import TableFilter from '../TableFilter'
import DateFilter, { Equality, DateFilterValue } from './DateFilter'

export interface Props {
  value: DateFilterValue | null
  label?: string
  onChange: (values: DateFilterValue | null) => Promise<void> | void
}

const TableFilterDate = ({ label = 'Date', onChange, value }: Props) => {
  return (
    <TableFilter
      label={label}
      value={renderDateFilterValue(value)}
      onRemove={() => onChange(null)}
      renderFilter={({ onClose }) => (
        <DateFilter
          defaultValues={value || undefined}
          onChange={async dateFilter => {
            onChange(dateFilter)
            onClose()
          }}
        />
      )}
    />
  )
}

const renderDateFilterValue = (date?: DateFilterValue | null) => {
  let value = ''

  if (
    date?.equality &&
    ![Equality.EQUALS, Equality.BETWEEN].includes(date.equality)
  ) {
    value += `${date.equality}`
  }

  if (date?.gte) {
    value += ` ${new Date(date.gte).toLocaleDateString()}`
  } else if (date?.lte) {
    value += ` ${new Date(date.lte).toLocaleDateString()}`
  }

  if (
    date?.gte &&
    date?.lte &&
    !isSameDay(parseISO(date.gte), parseISO(date.lte))
  ) {
    value += ` - ${new Date(date.lte).toLocaleDateString()}`
  }

  return value
}

export default TableFilterDate
