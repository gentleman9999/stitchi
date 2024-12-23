import { Check } from 'icons'
import React from 'react'

export interface DialogIconProps {}

const DialogIcon = (props: DialogIconProps) => {
  return (
    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary">
      <Check className="h-6 w-6 text-green-600" aria-hidden="true" />
    </div>
  )
}

export default DialogIcon
