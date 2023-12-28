import { AnimatePresence } from 'framer-motion'
import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'
import cx from 'classnames'

const FilterDialogContainer = ({
  children,
  open,
  onClose,
}: {
  children: React.ReactNode
  open: boolean
  onClose: () => void
}) => {
  return (
    <AnimatePresence>
      {open && (
        <Dialog.Root
          open={open}
          onOpenChange={val => val === false && onClose()}
        >
          <Dialog.Portal>
            <div className="relative z-40">
              <Dialog.Overlay
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                asChild
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </Dialog.Overlay>

              <div className="fixed inset-0 flex justify-center items-center p-4">
                <Dialog.Content
                  forceMount
                  className={cx(
                    'align-bottom bg-white overflow-scroll shadow-xl transform transition-all sm:align-middle sm:w-full flex flex-col max-h-[93%] sm:max-w-4xl fixed bottom-0 left-0 right-0 sm:right-auto sm:left-auto sm:bottom-auto sm:flex sm:relative rounded-t-lg sm:rounded-lg sm:my-8 text-sm',
                  )}
                >
                  {children}
                </Dialog.Content>
              </div>
            </div>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  )
}

export default FilterDialogContainer
