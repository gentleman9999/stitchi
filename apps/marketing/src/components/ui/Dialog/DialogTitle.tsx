import React from 'react'
import * as RuiDialog from '@radix-ui/react-dialog'
import cx from 'classnames'

export interface DialogTitleProps {
  children: React.ReactNode
  className?: string
  as?: any
}

const DialogTitle = (props: DialogTitleProps) => {
  const { as: Element = 'h3' } = props
  return (
    <RuiDialog.Title
      asChild
      className={cx(
        'text-lg leading-6 font-medium text-gray-900',
        props.className,
      )}
    >
      <Element>{props.children}</Element>
    </RuiDialog.Title>
  )
}

export default DialogTitle
