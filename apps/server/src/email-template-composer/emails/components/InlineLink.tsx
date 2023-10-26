import { Link, LinkProps } from '@react-email/components'
import React from 'react'

interface Props extends LinkProps {}

const InlineLink = ({ children, ...linkProps }: Props) => (
  <Link {...linkProps} className="text-gray-900 underline">
    {children}
  </Link>
)

export default InlineLink
