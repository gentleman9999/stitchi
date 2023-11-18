'use client'

import Link from 'next/link'
import React from 'react'
import cx from 'classnames'
import { usePathname, useSelectedLayoutSegments } from 'next/navigation'

export interface NavItem {
  href: string
  label: string
  icon?: React.ReactNode
  hidden?: boolean
  includedPaths?: string[]
  LinkComponent?: React.ElementType
  external?: boolean
  onClick?: () => void
  indicator?: boolean
  activeOverride?: boolean
}

const NavItem = ({
  href,
  label,
  icon,
  onClick,
  indicator,
  hidden,
  LinkComponent = Link,
  activeOverride,
  ...rest
}: NavItem) => {
  const pathname = usePathname()
  const external = 'external' in rest && rest.external

  const active =
    typeof activeOverride !== 'undefined'
      ? activeOverride
      : pathname?.startsWith(href)

  if (hidden) {
    return null
  }

  return (
    <LinkComponent
      onClick={onClick}
      href={href}
      target={external ? '_blank' : undefined}
      className={cx(
        'hover:bg-gray-50 rounded-md p-2 w-full text-sm font-medium flex items-center gap-2 text-gray-500 transition-all',
        {
          'bg-gray-50 ring-1 ring-gray-200': active,
        },
      )}
    >
      <div className="w-5 h-5 inline-flex items-center justify-center">
        {icon}
      </div>
      <div className="relative">
        {label}
        {indicator && (
          <div className="absolute top-0 -right-3 w-2 h-2 bg-primary rounded-full" />
        )}
      </div>
    </LinkComponent>
  )
}

export default NavItem
