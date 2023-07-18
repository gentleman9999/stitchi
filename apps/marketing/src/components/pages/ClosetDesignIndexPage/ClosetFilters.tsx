import TableFilterDate from '@components/ui/Table/TableFilterDate'
import TableFilters from '@components/ui/Table/TableFilters'
import TableFilterUser from '@components/ui/Table/TableFilterUser'
import React from 'react'
import { useCloset } from './closet-context'

interface Props {}

const ClosetFilters = ({}: Props) => {
  const { filters, setDateFilter } = useCloset()

  return (
    <TableFilters>
      <TableFilterUser label="Owner" value={null} onChange={() => {}} />
      <TableFilterDate
        label="Date created"
        value={filters.date}
        onChange={d => {
          setDateFilter(d)
        }}
      />
    </TableFilters>
  )
}

export default ClosetFilters
