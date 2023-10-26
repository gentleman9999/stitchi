import React from 'react'
import * as Popover from '@radix-ui/react-popover'
import cx from 'classnames'
import { Plus, XIcon } from 'icons'
import { motion } from 'framer-motion'

const fadeIn = {
  hidden: { opacity: 0.5, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { scale: 0.95 },
}

interface Props {
  label: string
  value?: string | null
  renderFilter: (params: { onClose: () => void }) => React.ReactNode
  onRemove?: () => void
}

const TableFilter = ({ renderFilter, value, label, onRemove }: Props) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <div
          className={cx(
            'border border-dashed rounded-md px-1 py-0.5 inline-flex items-center gap-2 text-sm text-gray-500 font-semibold cursor-pointer hover:bg-gray-50',
          )}
        >
          <div
            onClick={e => {
              if (value && onRemove) {
                e.stopPropagation()
                onRemove()
              }
            }}
            className="rounded-full bg-gray-400 hover:bg-gray-500 flex items-center justify-center"
          >
            {value && onRemove ? (
              <XIcon className="w-4 h-4 text-white stroke-2" />
            ) : (
              <Plus className="w-4 h-4 text-white stroke-2" />
            )}
          </div>
          {label}
          {value ? ` | ` : null}
          <span className="text-gray-700">{value}</span>
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={8} side="bottom" align="start" asChild>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeIn}
            transition={{
              duration: 0.1,
              delay: 0,
            }}
            className="p-3 bg-paper rounded-md border shadow-magical min-w-[320px]"
          >
            {renderFilter({ onClose: () => setOpen(false) })}
          </motion.div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default TableFilter
