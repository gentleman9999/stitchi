import Link from 'next/link'
import React from 'react'
import cx from 'classnames'

interface Props {
  label: string
  href: string
  active?: boolean
  className?: string
  [key: string]: any
}

const NavItem = ({ href, label, active, className, ...rest }: Props) => {
  return (
    <Link
      href={href}
      className={cx('text-sm font-semibold hover:text-gray-700', className, {
        underline: active,
      })}
      {...rest}
    >
      {label}
    </Link>
  )
}

export default NavItem
