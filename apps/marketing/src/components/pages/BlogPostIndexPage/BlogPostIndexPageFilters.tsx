import React from 'react'
import cx from 'classnames'
import Link from 'next/link'

interface Filter {
  id: string
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
      'flex flex-wrap justify-center md:justify-start mt-8 p-2 gap-2',
    )}
  >
    {filters.map(({ id, href, title, active }) => (
      <Link
        href={href}
        key={id}
        className={cx(
          'px-4 py-0.5 rounded-md transition-all whitespace-nowrap font-bold font-heading text-gray-900 border',
          { 'bg-gray-900 text-white': active },
        )}
      >
        {title}
      </Link>
    ))}
  </div>
)

export default BlogPostIndexPageFilters
