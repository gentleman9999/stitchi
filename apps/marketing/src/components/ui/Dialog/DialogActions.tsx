import React from 'react'
import cx from 'classnames'

export interface DialogActionsProps {
  children: React.ReactNode
  className?: string
}

const DialogActions = (props: DialogActionsProps) => {
  return (
    <div className={cx('mt-5 sm:mt-6', props.className)}>{props.children}</div>
  )
}

export default DialogActions
