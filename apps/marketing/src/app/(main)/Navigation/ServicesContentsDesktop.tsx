import routes from '@lib/routes'
import LinkBase from 'next/link'
import React from 'react'
import PopperButton from './PopperButton'

interface Props {}

const ServicesContentsDesktop = ({}: Props) => {
  return (
    <ul className="p-4 flex flex-col gap-2">
      <Link href={routes.internal.solutions.design.href()}>
        Free Professional Design
      </Link>

      <Link href={routes.internal.solutions.distribution.href()}>
        Fulfillment & Dropshipping
      </Link>

      <Link
        external
        href={routes.external.support.features.ecommerceFulfillment.href()}
      >
        Online Store & eCommerce
      </Link>

      <Link external href={routes.external.support.features.teamStores.href()}>
        Online Group Ordering
      </Link>

      <Link href={routes.internal.solutions.swagBox.href()}>
        Swag Boxes & Unwrapping Experiences
      </Link>
    </ul>
  )
}

const Link = ({
  href,
  children,
  external,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
}) => {
  return (
    <li className="flex-1 flex">
      <PopperButton>
        <LinkBase
          href={href}
          target={external ? '_blank' : undefined}
          className="flex-1 font-semibold hover:underline underline-offset-4"
        >
          {children}
        </LinkBase>
      </PopperButton>
    </li>
  )
}

export default ServicesContentsDesktop
