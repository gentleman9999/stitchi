import React from 'react'
import { Dialog as HuiDialog } from '@headlessui/react'
import cx from 'classnames'

export interface DialogTitleProps {
  children: React.ReactNode
  className?: string
  as?: any
}

const DialogTitle = (props: DialogTitleProps) => {
  const { as = 'h3' } = props
  return (
    <HuiDialog.Title
      as={as}
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
