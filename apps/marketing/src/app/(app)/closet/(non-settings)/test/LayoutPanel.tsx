'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useSelectedLayoutSegments } from 'next/navigation'
import React from 'react'

interface Props {
  panel: React.ReactNode
}

const LayoutPanel = ({ panel }: Props) => {
  const selectedPanelLayoutSegments = useSelectedLayoutSegments('panel')

  const displayPanel = selectedPanelLayoutSegments[0] !== 'page$'

  return (
    <AnimatePresence>
      {displayPanel ? (
        <motion.div
          key="panel"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="w-1/4 bg-green-300 p-8"
        >
          {panel}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default LayoutPanel
