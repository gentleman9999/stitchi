'use client'

import { DropdownMenu, DropdownMenuContent } from '@components/ui/dropdown-menu'
import React from 'react'

interface Props {
  trigger: React.ReactElement
  children: React.ReactNode
}

const NavigationDropdownMenu = (props: Props) => {
  const [open, setOpen] = React.useState(false)

  const Trigger = React.cloneElement(props.trigger, {
    onMouseEnter: () => {
      setOpen(true)
    },
  })

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      {Trigger}
      <DropdownMenuContent
        asChild
        forceMount
        side="bottom"
        sideOffset={12}
        align="end"
        alignOffset={-20}
        collisionPadding={8}
      >
        {props.children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavigationDropdownMenu
