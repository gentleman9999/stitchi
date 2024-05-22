import { cn } from '@lib/utils'
import React, { forwardRef } from 'react'

interface ContainerProps {
  className?: string
  children?: any
  clean?: boolean
  style?: React.CSSProperties
  containerClassName?: string
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, clean, style, containerClassName }, ref) => {
    const parentClassName = cn(
      '@container-normal w-full h-full',
      containerClassName,
    )

    const rootClassName = cn(
      {
        'mx-auto container px-6 @sm:px-10 @md:px-12 @7xl:px-24 w-full max-w-7xl':
          !clean,
      },
      className,
    )

    const props = {
      ref,
      className: rootClassName,
    }

    return (
      <div className={parentClassName}>
        <div {...props} style={style}>
          {children}
        </div>
      </div>
    )
  },
)

Container.displayName = 'Container'

export default Container
