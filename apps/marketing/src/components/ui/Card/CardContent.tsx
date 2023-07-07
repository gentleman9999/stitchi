import React from 'react'
import cx from 'classnames'

interface Props {
  children: React.ReactNode
  divide?: boolean
}

const CardContent = ({ children, divide }: Props) => {
  return (
    <div
      className={cx('pt-4 px-4 md:pt-6 md:px-6', {
        'border-t mt-4 md:mt-6': divide,
      })}
    >
      {children}
    </div>
  )
}

export default CardContent
