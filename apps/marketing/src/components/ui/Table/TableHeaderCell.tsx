import React from 'react'
import cx from 'classnames'

interface Props {
  children: React.ReactNode
  align?: 'left' | 'center' | 'right'
}

const TableHeaderCell = ({ children, align }: Props) => {
  return (
    <th
      className={cx('px-2 py-2 text-xs text-medium text-gray-600 border-b', {
        ['text-left']: align === 'left',
        ['text-center']: align === 'center',
        ['text-right']: align === 'right',
      })}
    >
      {children}
    </th>
  )
}

export default TableHeaderCell
