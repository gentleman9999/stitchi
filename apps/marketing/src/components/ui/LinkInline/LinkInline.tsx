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
  const BaseLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cx(
        {
          underline: underline === 'always',
          'hover:underline': underline === 'hover',
        },
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )

  if (external) {
    return <BaseLink href={href} target="_blank" rel="noreferrer" />
  }

  return (
    <Link href={href} passHref>
      <BaseLink />
    </Link>
  )
}

export default LinkInline
