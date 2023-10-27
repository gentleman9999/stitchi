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
      className={cx('px-4', {
        '!px-2': dense,
      })}
    >
      <div
        className={cx('pt-4', {
          'border-t mt-4': divide,
          '!pt-2': dense,
        })}
      >
        {children}
      </div>
    </div>
  )
}

export default CardContent
