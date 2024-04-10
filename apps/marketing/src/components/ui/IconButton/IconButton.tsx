'use client'

import React from 'react'
import cx from 'classnames'

export interface IconButtonProps {
  name: string
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  shift?: ('left' | 'right' | 'up' | 'down')[]
  disableGutters?: boolean
  size?: 'sm' | 'md'
  className?: string
  disabled?: boolean
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, forwardedRef) => {
    const {
      variant = 'primary',
      size = 'md',
      shift,
      className,
      children,
      disableGutters,
      disabled,
      onClick,
      ...rest
    } = props
    const ref = React.useRef<HTMLButtonElement>(null)

    const handleClick: IconButtonProps['onClick'] = e => {
      ref.current?.blur()

      if (forwardedRef && 'current' in forwardedRef) {
        forwardedRef.current?.blur()
      }

      onClick?.(e)
    }

    return (
      <button
        {...rest}
        ref={forwardedRef || ref}
        onClick={handleClick}
        aria-label={rest.name}
        className={cx(className, 'transition-all rounded-sm', {
          'hover:bg-gray-100 focus:bg-gray-100': variant === 'primary',
          'bg-transparent': variant === 'ghost',
          '-translate-x-2': shift?.includes('left'),
          'translate-x-2': shift?.includes('right'),
          '-translate-y-2': shift?.includes('up'),
          'translate-y-2': shift?.includes('down'),
          'p-0': disableGutters,
          'p-2': size === 'md',
          'p-1': size === 'sm',
          'pointer-events-none text-gray-400': disabled,
        })}
      >
        {children}
      </button>
    )
  },
)

IconButton.displayName = 'IconButton'

export default IconButton
