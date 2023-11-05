import React from 'react'

interface Props {
  children: React.ReactNode
}

const SlideOverActions = ({ children }: Props) => {
  return (
    <div className="p-2 sm:p-4 flex justify-end gap-2 border-t bg-white relative bottom-0 w-full">
      {children}
    </div>
  )
}

export default SlideOverActions
