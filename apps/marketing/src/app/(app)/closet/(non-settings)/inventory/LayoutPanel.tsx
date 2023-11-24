'use client'

import { useSelectedLayoutSegments } from 'next/navigation'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const LayoutPanel = ({ children }: Props) => {
  const selectedPanelLayoutSegments = useSelectedLayoutSegments('sidePanel')

  const displayPanel = selectedPanelLayoutSegments[0] !== 'page$'

  if (!displayPanel) return null

  return <div className="w-full @2xl:w-1/4 @2xl:min-w-[400px]">{children}</div>
}

export default LayoutPanel
