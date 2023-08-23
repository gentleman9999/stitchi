import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { motion } from 'framer-motion'

const fadeIn = {
  hidden: { opacity: 0.5, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { scale: 0.95 },
}

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
          asChild
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeIn}
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
          </motion.div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default Dropdown
