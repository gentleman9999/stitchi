import { cn } from '@lib/utils'
import React from 'react'

interface Props {
  className: string
}

const NavigationPopperContainer = ({
  children,
  className,
}: React.PropsWithChildren<Props>) => {
  return (
    <div className={cn(``, className)}>
      <div className="rounded-sm bg-white">{children}</div>
    </div>
  )
}

export default NavigationPopperContainer
