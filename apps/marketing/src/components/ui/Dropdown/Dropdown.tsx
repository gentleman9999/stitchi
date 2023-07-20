import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface Props {
  trigger: React.ReactNode
  items: React.ReactNode[]
}

const Dropdown = (props: Props) => {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger
        asChild
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        {props.trigger}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
          }}
          sideOffset={5}
          className="min-w-[220px] overflow-hidden border border-gray-100 bg-paper rounded-md shadow-magical transition-all flex flex-col"
        >
          <DropdownMenu.Arrow className="fill-white" />
          {props.items.map((item, idx) => {
            return (
              <DropdownMenu.Item key={idx} asChild>
                {item}
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default Dropdown
