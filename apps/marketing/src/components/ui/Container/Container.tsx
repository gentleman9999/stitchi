import cn from 'classnames'
import React, { forwardRef, JSXElementConstructor } from 'react'

interface ContainerProps {
  className?: string
  children?: any
  clean?: boolean
  style?: React.CSSProperties
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, clean, style }, ref) => {
    const rootClassName = cn(className, {
      'mx-auto container px-6 @sm:px-10 @md:px-12 @7xl:px-24  w-full max-w-7xl':
        !clean,
    })

    const props = {
      ref,
      className: rootClassName,
    }

    return (
      <div className="@container-normal w-full">
        <div {...props} style={style}>
          {children}
        </div>
      </div>
    )
  },
)

Container.displayName = 'Container'

export default Container
