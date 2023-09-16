import * as React from 'react'
import * as RuiToast from '@radix-ui/react-toast'
import cx from 'classnames'
import s from './Toast.module.css'

interface Action {
  label: string
  onClick: () => void
}

interface Props {
  open: boolean
  title?: string
  description?: string
  action?: Action
  onOpenChange: (open: boolean) => void
}

const Toast = ({ open, title, description, action, onOpenChange }: Props) => {
  return (
    <RuiToast.Provider swipeDirection="right">
      <RuiToast.Root
        className={cx(
          s.ToastRoot,
          'bg-paper rounded-md shadow-magical p-4 text-sm',
        )}
        open={open}
        onOpenChange={onOpenChange}
      >
        {title ? (
          <RuiToast.Title className="font-semibold">{title}</RuiToast.Title>
        ) : null}
        {description ? (
          <RuiToast.Description>{description}</RuiToast.Description>
        ) : null}

        {action ? (
          <RuiToast.Action
            className="ToastAction"
            asChild
            altText="Goto schedule to undo"
          >
            <button className="Button small green" onClick={action.onClick}>
              {action.label}
            </button>
          </RuiToast.Action>
        ) : null}
      </RuiToast.Root>
      <RuiToast.Viewport className="ToastViewport" />
    </RuiToast.Provider>
  )
}

export default Toast
