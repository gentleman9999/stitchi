import React from 'react'
import { DropdownItem, Dropdown as UiDropdown } from '@components/ui/Dropdown'
import Button from '@components/ui/ButtonV2/Button'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface DropdownItem {
  id: number | string
  label: string
  onClick: () => any
  active: boolean
}

interface Props {
  label: string
  items: DropdownItem[]
}

const Dropdown = ({ items, label }: Props) => {
  return (
    <UiDropdown
      align="start"
      renderTrigger={() => (
        <Button
          size="xl"
          variant="ghost"
          endIcon={<ChevronDownIcon className="w-5 h-5" />}
        >
          {label}
        </Button>
      )}
      renderItems={() =>
        items.map(item => (
          <DropdownItem
            showCheck
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
