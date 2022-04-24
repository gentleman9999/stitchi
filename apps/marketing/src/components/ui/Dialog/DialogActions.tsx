import React from 'react'
import cx from 'classnames'

export interface DialogActionsProps {
  children: React.ReactNode
  className?: string
}

const DialogActions = (props: DialogActionsProps) => {
  return <div className={cx(props.className)}>{props.children}</div>
}

export default DialogActions
