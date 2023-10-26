import React from 'react'
import cx from 'classnames'

interface Props {
  children: React.ReactNode
  className?: string
}

const TableCell = ({ children, className }: Props) => {
  return <td className={cx(className, 'border-b px-2 py-2')}>{children}</td>
}

export default TableCell
