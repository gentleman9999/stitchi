import Link from 'next/link'
import React from 'react'
import cx from 'classnames'
import { AnchorHTMLAttributes } from 'react'

export interface LinkInlineProps {
  children: React.ReactNode
  href: string
  external?: boolean
  className?: string
}

const LinkInline = ({
  children,
  href,
  external,
  className,
}: LinkInlineProps) => {
  const BaseLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className={cx('underline ', className)} {...props}>
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
