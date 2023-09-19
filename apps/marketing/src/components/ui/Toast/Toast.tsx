import * as React from 'react'
import * as RuiToast from '@radix-ui/react-toast'
import cx from 'classnames'
import s from './Toast.module.css'

interface Action {
  label: string
  onClick: () => void
}

export interface Props {
  open: boolean
  title?: string
  description?: string
  action?: Action
  severity?: 'default' | 'error'
  onOpenChange: (open: boolean) => void
}

const Toast = ({
  open,
  title,
  description,
  action,
  onOpenChange,
  severity = 'default',
}: Props) => {
  return (
    <RuiToast.Provider swipeDirection="right">
      <RuiToast.Root
        className={cx(
          s.ToastRoot,
          'rounded-md ring-1 shadow-magical p-4 text-sm',
          {
            'bg-paper ring-gray-100': severity === 'default',
            'bg-red-50  ring-red-200': severity === 'error',
          },
        )}
        open={open}
        onOpenChange={onOpenChange}
      >
        {title ? (
          <RuiToast.Title
            className={cx('font-semibold', {
              'text-gray-900': severity === 'default',
              'text-red-600': severity === 'error',
            })}
          >
            {title}
          </RuiToast.Title>
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
