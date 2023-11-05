import React from 'react'
import SlideOverCloseButton from './SlideOverCloseButton'

interface Props {
  title?: string
}

const SlideOverHeader = ({ title }: Props) => {
  return (
    <div className="p-2 sm:p-4 flex justify-between items-center border-b">
      {title ? <h2 className="text-lg font-semibold">{title}</h2> : null}
      <SlideOverCloseButton />
    </div>
  )
}

export default SlideOverHeader
