'use client'

import React from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const NavigationGroup = ({
  label,
  icon,
  defaultExpanded = false,
  children,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultExpanded?: boolean
}) => {
  return (
    <Collapsible.Root
      defaultOpen={defaultExpanded}
      className="flex flex-col gap-1"
    >
      <Collapsible.Trigger asChild>
        <button className="hover:bg-gray-50 rounded-md p-2 w-full text-sm font-medium flex items-center gap-2 text-gray-500 transition-all">
          <div className="w-5 h-5 inline-flex items-center justify-center">
            {icon}
          </div>
          <div>{label}</div>
          <div className="flex-1 flex justify-end">
            <ChevronDownIcon className="w-4 h-4 transition-all data-[state=open]:rotate-180" />
          </div>
        </button>
      </Collapsible.Trigger>

      <Collapsible.Content className="flex flex-col gap-1">
        {children}
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

export default NavigationGroup
