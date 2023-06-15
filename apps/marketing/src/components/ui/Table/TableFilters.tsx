import React from 'react'

interface Props {
  children: React.ReactNode
}

const TableFilters = ({ children }: Props) => {
  return <div className="flex gap-2 py-4">{children}</div>
}

export default TableFilters
