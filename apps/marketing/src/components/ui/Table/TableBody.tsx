import React from 'react'

interface Props {
  children: React.ReactNode
}

const TableBody = ({ children }: Props) => {
  return <tbody>{children}</tbody>
}

export default TableBody
