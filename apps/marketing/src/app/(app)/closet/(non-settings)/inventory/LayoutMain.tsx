'use client'

import { useSelectedLayoutSegments } from 'next/navigation'
import React from 'react'
import cx from 'classnames'

interface Props {
  children: React.ReactNode
}

const LayoutMain = ({ children }: Props) => {
  const selectedPanelLayoutSegments = useSelectedLayoutSegments('sidePanel')

  const displayPanel = selectedPanelLayoutSegments[0] !== 'page$'

  return (
    <div
      className={cx('flex-1', {
        'hidden @2xl:block': displayPanel,
      })}
    >
      {children}
    </div>
  )
}

export default LayoutMain
