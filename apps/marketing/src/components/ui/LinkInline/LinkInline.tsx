import Link from 'next/link'
import React from 'react'
import { AnchorHTMLAttributes } from 'react'

export interface LinkInlineProps {
  children: React.ReactNode
  href: string
  external?: boolean
}

const LinkInline = ({ children, href, external }: LinkInlineProps) => {
  const BaseLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="underline text-primaryAlt-500" {...props}>
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
