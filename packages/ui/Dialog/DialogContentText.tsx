import React from 'react'

export interface DialogContentTextProps {
  children: React.ReactNode
}

const DialogContentText = (props: DialogContentTextProps) => {
  return <div className="text-sm text-gray-500">{props.children}</div>
}

export default DialogContentText
