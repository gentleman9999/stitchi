import React from 'react'
import cx from 'classnames'

export interface IconButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  shift?: ('left' | 'right' | 'up' | 'down')[]
}

const IconButton = (props: IconButtonProps) => {
  const { variant = 'primary' } = props
  const ref = React.useRef<HTMLButtonElement>(null)
  const handleClick: IconButtonProps['onClick'] = e => {
    ref.current?.blur()
    props.onClick?.(e)
  }

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={cx('p-2 transition-all rounded-md', {
        'hover:bg-primary focus:bg-primaryAlt-300': variant === 'primary',
        'bg-transparent': variant === 'ghost',
        '-translate-x-2': props.shift?.includes('left'),
        'translate-x-2': props.shift?.includes('right'),
        '-translate-y-2': props.shift?.includes('up'),
        'translate-y-2': props.shift?.includes('down'),
      })}
    >
      {props.children}
    </button>
  )
}

export default IconButton
