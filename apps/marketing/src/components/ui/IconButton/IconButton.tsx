import React from 'react'
import cx from 'classnames'

export interface IconButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  shift?: ('left' | 'right' | 'up' | 'down')[]
  disableGutters?: boolean
  size?: 'sm' | 'md'
}

const IconButton = (props: IconButtonProps) => {
  const { variant = 'primary', size = 'md' } = props
  const ref = React.useRef<HTMLButtonElement>(null)
  const handleClick: IconButtonProps['onClick'] = e => {
    ref.current?.blur()
    props.onClick?.(e)
  }

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={cx('transition-all rounded-md', {
        'hover:bg-gray-100 focus:bg-gray-100': variant === 'primary',
        'bg-transparent': variant === 'ghost',
        '-translate-x-2': props.shift?.includes('left'),
        'translate-x-2': props.shift?.includes('right'),
        '-translate-y-2': props.shift?.includes('up'),
        'translate-y-2': props.shift?.includes('down'),
        'p-0': props.disableGutters,
        'p-2': size === 'md',
        'p-1': size === 'sm',
      })}
    >
      {props.children}
    </button>
  )
}

export default IconButton
