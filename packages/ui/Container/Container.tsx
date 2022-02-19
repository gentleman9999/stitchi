import cn from 'classnames'
import React, { forwardRef, JSXElementConstructor } from 'react'

interface ContainerProps {
  className?: string
  children?: any
  Component?: string | JSXElementConstructor<any>
  clean?: boolean
  style?: React.CSSProperties
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, Component = 'div', clean, style }, ref) => {
    const rootClassName = cn(className, {
      'mx-auto container px-6 md:px-20 lg:px-6 w-full max-w-6xl': !clean,
    })

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
