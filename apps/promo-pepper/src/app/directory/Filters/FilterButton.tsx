import React from 'react'
import cx from 'classnames'

interface Props {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  component?: React.ElementType<{ className?: string }>
}

export default function FilterButton(props: Props) {
  const {
    component: Component = 'button',
    className,
    children,
    ...rest
  } = props
  return (
    <Component
      className={cx(
        'p-2 sm:p-3 md:p-4 rounded-md border border-gray-300 font-semibold hover:border-gray-500 transition-all flex gap-2 whitespace-nowrap items-center',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}
