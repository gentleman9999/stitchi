import React from 'react'
import cx from 'classnames'

interface Props {
  children: React.ReactNode
  disablePadding?: boolean
}

const SlideOverContent = ({ children, disablePadding }: Props) => {
  return (
    <div
      className={cx('relative flex-1 overflow-scroll flex flex-col gap-8', {
        'p-4 sm:p-6': !disablePadding,
      })}
    >
      {children}
    </div>
  )
}

export default SlideOverContent
