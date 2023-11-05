'use client'

import React from 'react'
import { useSlideOver } from './slide-over-context'
import { XMarkIcon } from '@heroicons/react/20/solid'

const SlideOverCloseButton = () => {
  const { onOpenChange } = useSlideOver()

  return (
    <button type="button" onClick={() => onOpenChange(false)}>
      <XMarkIcon className="w-6 h-6" />
    </button>
  )
}

export default SlideOverCloseButton
