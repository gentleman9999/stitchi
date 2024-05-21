'use client'

import React, { useState, useEffect } from 'react'
import { useNavigation } from './NavigationContext'
import { cn } from '@lib/utils'

const DELAY = 300

const Backdrop = () => {
  const { expanded } = useNavigation()
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    let fadeTimeout: NodeJS.Timeout | null = null

    if (expanded) {
      setVisible(true)
      setFading(false)
      if (fadeTimeout) {
        clearTimeout(fadeTimeout)
      }
    } else {
      setFading(true)
      fadeTimeout = setTimeout(() => {
        setVisible(false)
        setFading(false)
      }, DELAY)
    }

    return () => {
      if (fadeTimeout) {
        clearTimeout(fadeTimeout)
      }
    }
  }, [expanded])

  return (
    <div
      className={cn(
        'absolute inset-0 bg-gray-900 z-10 transition-opacity duration-300',
        {
          'opacity-30': visible && !fading,
          'opacity-0': fading,
          hidden: !visible && !fading,
        },
      )}
    />
  )
}

export default Backdrop
