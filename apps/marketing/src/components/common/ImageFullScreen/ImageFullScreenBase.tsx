import React from 'react'
import cx from 'classnames'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowLeft, ArrowRight } from 'icons'

export interface Props {
  children: React.ReactNode
  open: boolean
  canNext: boolean
  canPrev: boolean
  onNext: () => void
  onPrev: () => void
  onClose: () => void
}

const ImageFullScreenBase = ({
  children,
  open,
  canNext,
  canPrev,
  onNext,
  onPrev,
  onClose,
}: Props) => {
  return (
    <Dialog.Root open={open} onOpenChange={() => onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-gray-800/70 fixed inset-0 z-50" />
        <Dialog.Content className="bg-white rounded-md fixed top-1/2 left-1/2 w-full max-w-[90%] md:max-w-5xl max-h-[80vh] -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="relative">
            <div className="hidden md:block">
              <button
                className={cx(
                  'absolute -left-12 top-1/2 text-white border rounded-full transition-all',
                  { 'opacity-0': !canPrev },
                )}
                onClick={onPrev}
              >
                <ArrowLeft />
              </button>
              <button
                className={cx(
                  'absolute -right-12 top-1/2 text-white border rounded-full transition-all',
                  {
                    'opacity-0': !canNext,
                  },
                )}
                onClick={onNext}
              >
                <ArrowRight />
              </button>
            </div>

            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ImageFullScreenBase
