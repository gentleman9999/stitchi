import Button from '@components/ui/ButtonV2/Button'
import React from 'react'
import { Dialog } from '..'

const useConfirmAction = <T extends any>(
  action: (params: T) => Promise<void> | void,
) => {
  const [params, setParams] = React.useState<T | null>(null)

  const handleClose = () => setParams(null)

  const confirm = (params: T) => {
    setParams(params)
  }

  const handleConfirm = async () => {
    if (params) {
      try {
        await action(params)
      } finally {
        handleClose()
      }
    }
  }

  const Dialog = (
    props: Omit<DialogProps<T>, 'params' | 'open' | 'onClose' | 'onConfirm'>,
  ) =>
    params ? (
      <ConfirmDialog<T>
        {...props}
        open
        params={params}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    ) : null

  return {
    confirm,
    ConfirmDialog: Dialog,
  }
}

interface DialogProps<T> {
  params: T
  renderTitle: (t: T) => string
  open: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  renderMessage?: (t: T) => string
  confirmText?: string
  cancelText?: string
}

const ConfirmDialog = <T extends any>({
  params,
  open,
  onClose,
  onConfirm,
  renderTitle,
  renderMessage,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
}: DialogProps<T>) => {
  const [loading, setLoading] = React.useState(false)

  const handleConfirm = async () => {
    setLoading(true)

    try {
      await onConfirm()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Title>{renderTitle(params)}</Dialog.Title>
      {renderMessage ? (
        <Dialog.Content>
          <Dialog.ContentText>{renderMessage(params)}</Dialog.ContentText>
        </Dialog.Content>
      ) : (
        <></>
      )}

      <Dialog.Actions className="flex justify-end gap-4">
        <Button variant="naked" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant="flat" onClick={handleConfirm} loading={loading}>
          {confirmText}
        </Button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default useConfirmAction
