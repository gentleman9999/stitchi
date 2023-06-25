import React from 'react'
import cx from 'classnames'

interface Props {
  children: React.ReactNode
  divider?: boolean
}

const ClosetSectionHeader = ({ children, divider }: Props) => {
  return (
    <div
      className={cx('mb-8', {
        'border-b': Boolean(divider),
      })}
    >
      {children}
    </div>
  )
}

export default ClosetSectionHeader
