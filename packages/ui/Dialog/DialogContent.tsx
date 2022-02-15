import React from 'react'

export interface DialogContentProps {
  children: React.ReactNode
}

const DialogContent = (props: DialogContentProps) => {
  return <>{props.children}</>
}

export default DialogContent
