import cn from 'classnames'
import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
} from 'react'
import s from './Button.module.css'
import LoadingDots from '../LoadingDots'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  size?: 'xs' | 'sm' | 'normal' | 'lg' | 'xl' | '2xl'
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
  startIcon?: React.ReactNode
  // Font bold
  bold?: boolean
}

const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = 'flat',
    size = 'normal',
    children,
    active,
    width,
    endIcon,
    startIcon,
    color = 'primary',
    loading = false,
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
      [s.naked]: variant === 'naked',
      [s.loading]: loading,
      [s.disabled]: props.disabled,
      [s.brandColors]: color === 'brandPrimary',
      [s.shadow1]: shadow,
      '!font-bold': bold,
      [s.xs]: size === 'xs',
      [s.sm]: size === 'sm',
      [s.normal]: size === 'normal',
      [s.lg]: size === 'lg',
      [s.xl]: size === 'xl',
      [s.xxl]: size === '2xl',
    },
    className,
  )

  const disabled = props.disabled || loading

  return (
    <Component
      aria-pressed={active}
      aria-label={rest.name}
      data-variant={variant}
      ref={buttonRef}
      className={rootClassName}
      disabled={disabled}
      type={Component === 'button' ? props.type || 'button' : undefined}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {!loading && Boolean(startIcon) && (
        <div className="mr-2">{startIcon}</div>
      )}

      <div className={loading ? 'opacity-0' : ''}>{children}</div>

      {loading && (
        <i className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <LoadingDots />
        </i>
      )}

      {!loading && Boolean(endIcon) && <div className="ml-2">{endIcon}</div>}
    </Component>
  )
})

Button.displayName = 'Button'

export default Button
