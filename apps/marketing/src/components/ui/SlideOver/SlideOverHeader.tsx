import { XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { useSlideOver } from './slide-over-context'

interface Props {
  title?: string
}

const SlideOverHeader = ({ title }: Props) => {
  const { onOpenChange } = useSlideOver()
  return (
    <div className="p-2 sm:p-4 flex justify-between items-center border-b">
      {title ? <h2 className="text-lg font-semibold">{title}</h2> : null}
      <button type="button" onClick={() => onOpenChange(false)}>
        <XMarkIcon className="w-6 h-6" />
      </button>
    </div>
  )
}

export default SlideOverHeader
