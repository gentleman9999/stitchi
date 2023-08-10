import React from 'react'
import cx from 'classnames'

interface Props {
  children: React.ReactNode
  divide?: boolean
  dense?: boolean
}

const CardContent = ({ children, divide, dense }: Props) => {
  return (
    <div
      className={cx('pt-4 px-4 md:pt-6 md:px-6', {
        'border-t mt-4 md:mt-6': divide,
        '!pt-2 !px-2 md:!pt-4 md:!px-4': dense,
      })}
    >
      {children}
    </div>
  )
}

export default CardContent
