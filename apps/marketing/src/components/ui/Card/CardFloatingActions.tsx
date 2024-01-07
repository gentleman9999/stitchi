import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { DropdownItem, Dropdown, DropdownItemProps } from '../Dropdown'

interface Props {
  items: DropdownItemProps[]
}

const CardFloatingActions = ({ items }: Props) => {
  return (
    <div>
      <Dropdown
        renderTrigger={() => (
          <button className="opacity-0 group-hover:opacity-100 p-1 bg-gray-900/60 hover:bg-gray-900/70 data-[state=open]:opacity-100 rounded-sm transition-all absolute top-2 right-2 outline-none">
            <EllipsisHorizontalIcon className="w-6 text-white" />
          </button>
        )}
        renderItems={() =>
          items.map(item => (
            <React.Fragment key={item.label}>
              <DropdownItem {...item} />
            </React.Fragment>
          ))
        }
      />
    </div>
  )
}

export default CardFloatingActions
