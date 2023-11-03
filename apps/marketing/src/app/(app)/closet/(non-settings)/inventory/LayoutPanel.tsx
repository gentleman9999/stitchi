'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useSelectedLayoutSegments } from 'next/navigation'
import React from 'react'

interface Props {
  sidePanel: React.ReactNode
}

const LayoutPanel = ({ sidePanel }: Props) => {
  const selectedPanelLayoutSegments = useSelectedLayoutSegments('mainContent')

  console.log('selectedPanelLayoutSegments', selectedPanelLayoutSegments)

  const displayPanel = true

  return (
    <AnimatePresence>
      {displayPanel ? (
        <motion.div
          key="sidePanel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-1/4 bg-green-300 p-8"
        >
          {sidePanel}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default LayoutPanel
