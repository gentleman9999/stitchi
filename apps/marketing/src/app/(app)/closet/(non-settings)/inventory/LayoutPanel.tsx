'use client'

import { useSelectedLayoutSegments } from 'next/navigation'
import React from 'react'

interface Props {
  sidePanel: React.ReactNode
}

const LayoutPanel = ({ sidePanel }: Props) => {
  const selectedPanelLayoutSegments = useSelectedLayoutSegments('sidePanel')

  const displayPanel = selectedPanelLayoutSegments[0] !== 'page$'

  if (!displayPanel) return null

  return <div className="w-1/4 sm:min-w-[400px]">{sidePanel}</div>
}

export default LayoutPanel
