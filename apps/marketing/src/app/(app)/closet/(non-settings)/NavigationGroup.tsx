'use client'

import React from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import styles from './NavigationGroup.module.css'
import { usePathname } from 'next/navigation'

const NavigationGroup = ({
  label,
  icon,
  children,
  paths,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
  paths: string[]
}) => {
  const pathname = usePathname()
  const defaultExpanded = paths.some(path => pathname?.startsWith(path))

  return (
    <Collapsible.Root
      defaultOpen={defaultExpanded}
      className="flex flex-col gap-1"
    >
      <Collapsible.Trigger asChild>
        <button className="group hover:bg-gray-50 rounded-md p-2 w-full text-sm font-medium flex items-center gap-2 text-gray-700 transition-all">
          <div className="w-5 h-5 inline-flex items-center justify-center">
            {icon}
          </div>
          <div>{label}</div>
          <div className="flex-1 flex justify-end">
            <ChevronDownIcon className="w-4 h-4 transition-all group-data-[state=open]:rotate-180 " />
          </div>
        </button>
      </Collapsible.Trigger>

      <Collapsible.Content className={styles.CollapsibleContent}>
        <div className="flex flex-col gap-1">{children}</div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

export default NavigationGroup
