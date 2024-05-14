'use client'

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
  side?: DropdownMenu.MenuContentProps['side']
  align?: DropdownMenu.MenuContentProps['align']
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
          side={props.side}
          align={props.align}
          collisionPadding={5}
          asChild
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeIn}
            className="z-10 overflow-auto border bg-paper rounded-sm shadow-magical transition-all flex flex-col p-1 min-w-[--radix-dropdown-menu-trigger-width] max-h-[calc(var(--radix-dropdown-menu-content-available-height)-1rem)]"
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
