import Link from 'next/link'
import React from 'react'
import cx from 'classnames'
import { AnchorHTMLAttributes } from 'react'

export interface LinkInlineProps {
  children: React.ReactNode
  href: string
  external?: boolean
  className?: string
  underline?: 'always' | 'never' | 'hover'
}

const LinkInline = ({
  children,
  href,
  external,
  className,
  underline = 'always',
}: LinkInlineProps) => {
  const externalProps = external
    ? {
        target: '_blank',
        rel: 'noreferrer',
      }
    : {}

  return (
    <Link
      {...externalProps}
      href={href}
      className={cx(
        {
          underline: underline === 'always',
          'hover:underline': underline === 'hover',
        },
        className,
      )}
    >
      {children}
    </Link>
  )
}

export default LinkInline
