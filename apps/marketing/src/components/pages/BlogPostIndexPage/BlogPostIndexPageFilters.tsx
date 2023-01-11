import React from 'react'
import Link from 'next/link'
import cx from 'classnames'
import s from './BlogPostIndexPageFilters.module.css'

interface Filter {
  title: string
  href: string
  active?: boolean
}

export interface Props {
  filters: Filter[]
  className?: string
}

const BlogPostIndexPageFilters = ({ filters, className }: Props) => (
  <div
    className={cx(
      className,
      'flex flex-wrap justify-center md:justify-start mt-8',
    )}
  >
    {filters.map(({ href, title, active }) => (
      <Link href={href} key={href} className={cx(s.filter, { [s.active]: active })}>
        {title}
      </Link>
    ))}
  </div>
)

export default BlogPostIndexPageFilters
