import React from 'react'
import cx from 'classnames'

interface Props {
  children: React.ReactNode
  size?: 'full' | 'sm'
}

const ClosetPageContainer = ({ children, size = 'full' }: Props) => {
  return (
    <div
      className={cx('px-6 w-full m-auto', {
        'max-w-2xl': size === 'sm',
      })}
    >
      {children}
    </div>
  )
}

export default ClosetPageContainer
