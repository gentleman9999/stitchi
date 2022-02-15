import React from 'react'

export interface DialogActionsProps {
  children: React.ReactNode
}

const DialogActions = (props: DialogActionsProps) => {
  return <div className="mt-5 sm:mt-6">{props.children}</div>
}

export default DialogActions
