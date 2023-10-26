import React from 'react'

interface Props {
  children: React.ReactNode
}

const TableHeader = ({ children }: Props) => {
  return <thead className="bg-gray-100 text-sm font-medium">{children}</thead>
}

export default TableHeader
