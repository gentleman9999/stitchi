import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { motion } from 'framer-motion'

const fadeIn = {
  hidden: { opacity: 0.5, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { scale: 0.95 },
}

interface Props {
  renderTrigger: () => React.ReactNode
  renderItems: () => React.ReactNode[]
}

const Dropdown = (props: Props) => {
  const items = props.renderItems()

  if (!items.length) {
    return null
  }

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        {props.renderTrigger()}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
          }}
          sideOffset={5}
          asChild
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeIn}
            className="overflow-hidden border border-gray-100 bg-paper rounded-md shadow-magical transition-all flex flex-col p-1"
          >
            <DropdownMenu.Arrow className="fill-white" />
            {items.map((item, idx) => {
              return (
                <DropdownMenu.Item key={idx} asChild>
                  {item}
                </DropdownMenu.Item>
              )
            })}
          </motion.div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default Dropdown
