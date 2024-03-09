'use client'
import React from 'react'
import s from './layout.module.css'
import routes from '@lib/routes'
import { useParams } from 'next/navigation'
import cx from 'classnames'
import Link from 'next/link'

const CategoryNavItem = ({
  categorySlug,
  children,
}: {
  categorySlug: string
  children: React.ReactNode
}) => {
  const { catchAllSlug } = useParams<{
    catchAllSlug?: string[]
  }>()!

  console.log('CATCH ALL SLUG', catchAllSlug)

  const parentCategorySlug = catchAllSlug?.[0]

  const href = routes.internal.catalog.category.show.href({
    categorySlug,
  })

  const isActive =
    parentCategorySlug === categorySlug ||
    (categorySlug === 'catalog' && !parentCategorySlug)

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
