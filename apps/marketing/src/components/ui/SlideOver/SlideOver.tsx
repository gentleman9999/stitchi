import React from 'react'
import cx from 'classnames'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'

interface Props extends Dialog.DialogProps {
  className?: string
}

const SlideOver = ({ children, className, open, ...dialogProps }: Props) => {
  return (
    <Dialog.Root {...dialogProps}>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay
              forceMount
              className="fixed inset-0 bg-transparent "
            />
            <Dialog.Content forceMount asChild>
              <motion.div
                initial={{ translateX: '100%' }}
                animate={{ translateX: '0%' }}
                exit={{ translateX: '100%' }}
                className={cx(
                  'z-10 fixed right-0 top-0 h-screen bg-paper border-l  w-full sm:w-auto sm:max-w-[90vw] flex flex-col shadow-magical',
                  className,
                )}
              >
                {children}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  )
}

export default SlideOver
