'use client'

import React from 'react'
import cx from 'classnames'
import { useAppLayoutContext } from '../app-layout-context'

interface Props {
  children: React.ReactNode
  panelHeight: string
  topbarHeight: string
}

const ClosetLayoutWrapperPanel = (props: Props) => {
  const { sidebarOpen } = useAppLayoutContext()

  return (
    <nav
      className={cx(
        `fixed h-[${props.panelHeight}] left-0 top-[${props.topbarHeight}] border-r bg-paper w-0 md:w-64 z-10 overflow-y-scroll`,
        { 'w-screen': sidebarOpen },
      )}
    >
      {props.children}
    </nav>
  )
}

export default ClosetLayoutWrapperPanel
