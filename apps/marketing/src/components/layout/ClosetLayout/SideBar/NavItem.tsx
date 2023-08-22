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
}: (NavItem | SubNavItem) & { active?: boolean; onClick: () => void }) => {
  return (
    <LinkComponent
      onClick={onClick}
      href={href}
      className={cx(
        'hover:bg-gray-50 rounded-md p-2 w-full text-sm font-medium flex items-center gap-2 text-gray-500',
        {
          'bg-gray-50 border border-gray-200': active,
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
