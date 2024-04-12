import { PopoverButton } from '@components/ui/popover'
import routes from '@lib/routes'
import LinkBase from 'next/link'
import React, { Fragment } from 'react'

interface Props {}

const ServicesContentsDesktop = ({}: Props) => {
  return (
    <ul className="p-2">
      <Link href={routes.internal.solutions.design.href()}>Custom Design</Link>
      <Link href={routes.internal.solutions.customization.href()}>
        Bulk Orders
      </Link>
      <Link href={routes.internal.solutions.distribution.href()}>
        Express Delivery
      </Link>

      <Link href={routes.internal.solutions.swagBox.href()}>
        Unwrapping Experiences
      </Link>
    </ul>
  )
}

const Link = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  return (
    <li>
      <PopoverButton as={Fragment}>
        <LinkBase
          href={href}
          className="block p-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          {children}
        </LinkBase>
      </PopoverButton>
    </li>
  )
}

export default ServicesContentsDesktop
