import React from 'react'
import cx from 'classnames'

interface Props {
  children: React.ReactNode
  disableGutters?: boolean
}

const TableFilters = ({ children, disableGutters }: Props) => {
  return (
    <div
      className={cx('flex gap-2 py-2 px-6 border-b', {
        '!px-0': disableGutters,
      })}
    >
      {children}
    </div>
  )
}

export default TableFilters
