'use client'

import React from 'react'
import {
  ClosetSectionProvider,
  useClosetSectionContext,
} from './closet-section-context'

interface Props {
  children?:
    | React.ReactNode
    | ((state: ReturnType<typeof useClosetSectionContext>) => React.ReactNode)
}

const withClosetSectionContext = (Component: React.ComponentType<Props>) => {
  const WithClosetSectionContext = (
    props: Props & {
      tabs?: ReturnType<typeof useClosetSectionContext>['tabs']
      loading?: boolean
    },
  ) => {
    const { tabs, loading, ...rest } = props

    return (
      <ClosetSectionProvider tabs={tabs} loading={loading}>
        <Component {...rest} />
      </ClosetSectionProvider>
    )
  }

  return WithClosetSectionContext
}

const ClosetSection = ({ children }: Props) => {
  const state = useClosetSectionContext()

  return (
    <div className="pb-16">
      {typeof children === 'function' ? children(state) : children}
    </div>
  )
}

export default withClosetSectionContext(ClosetSection)
