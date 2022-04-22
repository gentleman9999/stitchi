import React from 'react'
import { Dialog as HuiDialog } from '@headlessui/react'
import cx from 'classnames'

export interface DialogTitleProps {
  children: React.ReactNode
  className?: string
}

const DialogTitle = (props: DialogTitleProps) => {
  return (
    <HuiDialog.Title
      as="h3"
      className={cx(
        'text-lg leading-6 font-medium text-gray-900',
        props.className,
      )}
    >
      {props.children}
    </HuiDialog.Title>
  )
}

export default DialogTitle
