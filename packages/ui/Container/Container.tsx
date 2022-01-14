import cn from 'classnames'
import React, { forwardRef } from 'react'

interface ContainerProps {
  className?: string
  children?: any
  el?: HTMLElement
  clean?: boolean
  style?: React.CSSProperties
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, el = 'div', clean, style }, ref) => {
    const rootClassName = cn(className, {
      'mx-auto container px-6 w-full max-w-6xl': !clean,
    })

    let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
      el as any

    const props = {
      ref,
      className: rootClassName,
    }

    return (
      <Component {...props} style={style}>
        {children}
      </Component>
    )
  },
)

Container.displayName = 'Container'

export default Container
