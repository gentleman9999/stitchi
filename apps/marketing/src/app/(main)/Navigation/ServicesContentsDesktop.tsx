import routes from '@lib/routes'
import LinkBase from 'next/link'
import React from 'react'
import PopperButton from './PopperButton'

interface Props {}

const ServicesContentsDesktop = ({}: Props) => {
  return (
    <ul className="p-4 flex flex-col gap-2">
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
    <li className="flex-1 flex">
      <PopperButton>
        <LinkBase
          href={href}
          className="flex-1 font-semibold hover:underline underline-offset-4"
        >
          {children}
        </LinkBase>
      </PopperButton>
    </li>
  )
}

export default ServicesContentsDesktop
