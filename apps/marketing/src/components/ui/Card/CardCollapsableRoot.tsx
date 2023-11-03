'use client'

import React from 'react'
import { useCardContext } from './card-context'
import * as Collapsible from '@radix-ui/react-collapsible'

interface Props {
  children: React.ReactNode
}

const CardCollapsableRoot = ({ children }: Props) => {
  const { collapsed, setCollapsed } = useCardContext()

  return (
    <Collapsible.Root
      open={!collapsed}
      onOpenChange={open => setCollapsed(!open)}
    >
      {children}
    </Collapsible.Root>
  )
}

export default CardCollapsableRoot
