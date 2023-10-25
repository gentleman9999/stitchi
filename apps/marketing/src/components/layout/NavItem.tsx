import Link from 'next/link'
import React from 'react'
import cx from 'classnames'
import { NavItem, SubNavItem } from './ClosetLayout/closet-layout-context'

const NavItem = ({
  href,
  label,
  icon,
  active,
  onClick,
  indicator,
  hidden,
  LinkComponent = Link,
  ...rest
}: (NavItem | Omit<SubNavItem, 'type'>) & {
  active?: boolean
  onClick?: () => void
  indicator?: boolean
}) => {
  const external = 'external' in rest && rest.external

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
