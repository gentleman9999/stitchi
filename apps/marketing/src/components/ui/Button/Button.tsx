import cn from 'classnames'
import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
} from 'react'
import mergeRefs from 'react-merge-refs'
import s from './Button.module.css'
import LoadingDots from '../LoadingDots'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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

const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
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
    shadow = false,
    bold = false,
    style = {},
    Component = 'button',
    ...rest
  } = props
  const ref = useRef<typeof Component>(null)

  const rootClassName = cn(
    s.root,
    {
      [s.ghost]: variant === 'ghost',
      [s.slim]: slim,
      [s.naked]: variant === 'naked',
      [s.loading]: loading,
      [s.disabled]: props.disabled,
      [s.brandColors]: color === 'brandPrimary',
      [s.shadow1]: shadow,
      '!font-bold': bold,
    },
    className,
  )

  const disabled = props.disabled || loading

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
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
