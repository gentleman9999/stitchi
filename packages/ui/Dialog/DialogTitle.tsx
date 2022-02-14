import React from 'react'
import { Dialog as HuiDialog } from '@headlessui/react'

export interface DialogTitleProps {
  children: React.ReactNode
}

const DialogTitle = (props: DialogTitleProps) => {
  return (
    <HuiDialog.Title
      as="h3"
      className="text-lg leading-6 font-medium text-gray-900"
    >
      {props.children}
    </HuiDialog.Title>
  )
}

export default DialogTitle
