import type React from 'react'
import cx from 'classnames'

export interface ButtonProps {
  className?: string
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
}

const Button: React.FC<ButtonProps> = props => {
  const { children, className = '', ...rest } = props

  return (
    <button
      type="button"
      className={cx(
        'bg-primary flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
