import React from 'react'
import {
  ClosetSectionProvider,
  useClosetSectionContext,
} from './closet-section-context'

interface Props {
  tabs?: ReturnType<typeof useClosetSectionContext>['tabs']
  children:
    | React.ReactNode
    | ((state: ReturnType<typeof useClosetSectionContext>) => React.ReactNode)
}

const ClosetSection = ({ children, tabs }: Props) => {
  return (
    <ClosetSectionProvider tabs={tabs}>
      <ClosetSectionInner>{children}</ClosetSectionInner>
    </ClosetSectionProvider>
  )
}

const ClosetSectionInner = ({ children }: Props) => {
  const state = useClosetSectionContext()
  return (
    <div className="pb-8">
      {typeof children === 'function' ? children(state) : children}
    </div>
  )
}

export default ClosetSection
