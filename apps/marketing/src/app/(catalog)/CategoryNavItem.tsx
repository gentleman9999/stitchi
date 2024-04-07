'use client'
import React from 'react'
import s from './layout.module.css'
import routes from '@lib/routes'
import { usePathname } from 'next/navigation'
import cx from 'classnames'
import Link from 'next/link'

const CategoryNavItem = ({
  path,
  children,
}: {
  path: string
  children: React.ReactNode
}) => {
  const pathname = usePathname()
  const [isActive, setIsActive] = React.useState(false)

  React.useEffect(() => {
    if (pathname?.startsWith(routes.internal.catalog.all.href())) {
      setIsActive(path === routes.internal.catalog.all.href())
    } else {
      setIsActive(Boolean(pathname?.startsWith(path)))
    }
  }, [pathname, path])

  const href = routes.internal.catalog.category.show.href({
    categorySlug: path,
  })

  return (
    <Link
      className={cx(s.link, {
        'underline underline-offset-8': isActive,
      })}
      href={href}
    >
      {children}
    </Link>
  )
}

export default CategoryNavItem
