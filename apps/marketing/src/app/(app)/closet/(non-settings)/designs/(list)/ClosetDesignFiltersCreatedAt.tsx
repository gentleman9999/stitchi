'use client'

import { TableFilterDate } from '@components/ui/Table'
import React from 'react'
import { useCloset } from './closet-context'

const ClosetDesignFiltersCreatedAt = () => {
  const { filters, setDateFilter } = useCloset()

  return (
    <TableFilterDate
      label="Date created"
      value={filters.date}
      onChange={d => {
        setDateFilter(d)
      }}
    />
  )
}

export default ClosetDesignFiltersCreatedAt
