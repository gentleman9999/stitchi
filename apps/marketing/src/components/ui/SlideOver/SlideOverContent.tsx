import React from 'react'

interface Props {
  children: React.ReactNode
}

const SlideOverContent = ({ children }: Props) => {
  return (
    <div className="relative p-4 sm:p-6 flex-1 overflow-scroll">{children}</div>
  )
}

export default SlideOverContent
