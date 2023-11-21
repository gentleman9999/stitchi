import Link, { LinkProps } from 'next/link'
import React from 'react'
import cx from 'classnames'

export interface LinkInlineProps extends LinkProps {
  children: React.ReactNode
  href: string
  external?: boolean
  className?: string
  underline?: 'always' | 'never' | 'hover'
  target?: string
}

const LinkInline = ({
  children,
  href,
  external,
  className,
  underline = 'always',
  target,
  ...rest
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
      {...rest}
      target={target}
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
