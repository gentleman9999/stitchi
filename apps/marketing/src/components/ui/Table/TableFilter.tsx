import React from 'react'
import * as Popover from '@radix-ui/react-popover'
import cx from 'classnames'
import { Plus, XIcon } from 'icons'

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
            'border border-dashed rounded-full px-2 py-1 inline-flex items-center gap-2 text-sm text-gray-500 font-semibold cursor-pointer hover:bg-gray-50',
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
        <Popover.Content
          sideOffset={8}
          side="bottom"
          align="start"
          className="p-3 bg-paper rounded-md border shadow-magical min-w-[320px]"
        >
          {renderFilter({ onClose: () => setOpen(false) })}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default TableFilter
