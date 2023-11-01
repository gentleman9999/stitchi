'use client'

import cn from 'classnames'
import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
} from 'react'
import s from './Button.module.css'
import LoadingDots from '../LoadingDots'

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  slim?: boolean
  variant?: 'flat' | 'ghost' | 'naked'
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  Component?: string | JSXElementConstructor<any>
  width?: string | number
  loading?: boolean
  disabled?: boolean
  color?: 'primary' | 'brandPrimary'
  shadow?: boolean
  endIcon?: React.ReactNode
  // Font bold
  bold?: boolean
}

const Button: React.FC<Props> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = 'flat',
    slim = false,
    children,
    active,
    width,
    endIcon,
    color = 'primary',
    loading = false,
    disabled = false,
    shadow = false,
    bold = false,
    style = {},
    Component = 'button',
    ...rest
  } = props

  const rootClassName = cn(
    s.root,
    {
      [s.ghost]: variant === 'ghost',
      [s.slim]: slim,
      [s.naked]: variant === 'naked',
      [s.loading]: loading,
      [s.disabled]: disabled,
      [s.brandColors]: color === 'brandPrimary',
      [s.shadow1]: shadow,
      '!font-bold': bold,
    },
    className,
  )

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={buttonRef}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="pl-2 m-0 flex">
          <LoadingDots />
        </i>
      )}
      {!loading && Boolean(endIcon) && <div className="ml-2">{endIcon}</div>}
    </Component>
  )
})

Button.displayName = 'Button'

export default Button
