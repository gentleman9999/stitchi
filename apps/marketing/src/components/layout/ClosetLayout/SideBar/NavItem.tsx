import Link from 'next/link'
import React from 'react'
import cx from 'classnames'
import { NavItem, SubNavItem } from '../closet-layout-context'

const NavItem = ({
  href,
  label,
  icon,
  active,
  onClick,
  LinkComponent = Link,
  ...rest
}: (NavItem | SubNavItem) & { active?: boolean; onClick: () => void }) => {
  const external = 'external' in rest && rest.external

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
      {label}
    </LinkComponent>
  )
}

export default NavItem
