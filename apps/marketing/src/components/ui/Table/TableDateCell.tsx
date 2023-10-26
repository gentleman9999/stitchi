import useTimeZone from '@components/hooks/useTimeZone'
import { isSameYear } from 'date-fns'
import { format } from 'date-fns-tz'
import React from 'react'

interface Props {
  date: Date
}

const TableDateCell = ({ date }: Props) => {
  const { timeZone } = useTimeZone()

  return (
    <span className="text-gray-600 text-sm">{formatDate(date, timeZone)}</span>
  )
}

const formatDate = (date: Date, timeZone: string) => {
  if (isSameYear(date, new Date())) {
    return format(date, 'MMM d', { timeZone })
  }

  return format(date, 'MMM d, yyyy', { timeZone })
}

export default TableDateCell
