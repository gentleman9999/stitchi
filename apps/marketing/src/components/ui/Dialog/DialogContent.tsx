import React from 'react'
import cx from 'classnames'
// import * as RuiDialog from '@radix-ui/react-dialog'
import DialogSectionPadding from './DialogSectionPadding'

export interface DialogContentProps {
  children: React.ReactNode
  dividers?: boolean
}

const DialogContent = (props: DialogContentProps) => {
  return (
    // <RuiDialog.Description>
    <div>
      {props.dividers && <Divider className="mt-4 sm:mt-6" />}
      <div
        className={cx('flex-1 overflow-y-scroll', {
          'pb-4 sm:pb-6': Boolean(props.dividers),
        })}
      >
        <DialogSectionPadding>{props.children}</DialogSectionPadding>
      </div>
      {props.dividers && <Divider />}
    </div>
    // </RuiDialog.Description>
  )
}

const Divider = ({ className }: { className?: string }) => {
  return <div className={cx('border-t', className)} />
}

export default DialogContent
