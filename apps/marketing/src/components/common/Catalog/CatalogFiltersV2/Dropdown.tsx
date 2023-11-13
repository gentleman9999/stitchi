import React from 'react'
import { DropdownItem, Dropdown as UiDropdown } from '@components/ui/Dropdown'
import Button from '@components/ui/ButtonV2/Button'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import cx from 'classnames'

interface DropdownItem {
  id: number | string
  label: string
  onClick: () => any
  active: boolean
}

interface Props {
  label: React.ReactNode
  items: DropdownItem[]
  multiple?: boolean
  align?: 'start' | 'end'
}

const Dropdown = ({ items, label, multiple, align = 'start' }: Props) => {
  const active = Boolean(items.find(item => item.active))

  return (
    <UiDropdown
      align={align}
      renderTrigger={() => (
        <Button
          variant="ghost"
          className={cx('flex-1 !py-1 !px-2.5 group !justify-between', {
            '!border-gray-400': active,
          })}
          endIcon={
            <ChevronDownIcon className="w-5 h-5 group-data-[state=open]:rotate-180 transition-all" />
          }
        >
          {label}
        </Button>
      )}
      renderItems={() =>
        items.map(item => (
          <DropdownItem
            showCheck={Boolean(multiple)}
            key={item.id}
            label={item.label}
            onClick={item.onClick}
            active={item.active}
          />
        ))
      }
    />
  )
}

export default Dropdown
