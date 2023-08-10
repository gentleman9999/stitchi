import React from 'react'

interface Props {
  children: React.ReactNode
}

const SlideOverActions = ({ children }: Props) => {
  return (
    <div className="p-4 sm:p-6 flex justify-end gap-2 border-t bg-white">
      {children}
    </div>
  )
}

export default SlideOverActions
