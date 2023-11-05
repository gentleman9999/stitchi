'use client'

import React from 'react'
import cx from 'classnames'
import { useAppLayoutContext } from '../app-layout-context'

interface Props {
  children: React.ReactNode
}

const ClosetLayoutWrapperPanel = (props: Props) => {
  const { sidebarOpen } = useAppLayoutContext()

  return (
    <nav
      className={cx(
        `fixed h-[calc(100vh-var(--topbar-height))] left-0 top-topbar-height border-r bg-paper w-0 md:w-64 z-10 overflow-y-scroll`,
        { 'w-screen': sidebarOpen },
      )}
    >
      {props.children}
    </nav>
  )
}

export default ClosetLayoutWrapperPanel
