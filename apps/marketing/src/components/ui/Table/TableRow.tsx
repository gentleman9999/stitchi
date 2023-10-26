import React from 'react'
import cx from 'classnames'

interface Props {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const TableRow = ({ children, className, style, onClick }: Props) => {
  const isClickable = Boolean(onClick)

  return (
    <tr
      className={cx(className, {
        ['hover:bg-gray-50 cursor-pointer']: isClickable,
      })}
      style={style}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

export default TableRow
