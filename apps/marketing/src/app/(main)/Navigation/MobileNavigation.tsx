import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@components/ui/sheet'
import { COMPANY_NAME } from '@lib/constants'
import Link from 'next/link'
import routes from '@lib/routes'
import { HomeIcon } from '@heroicons/react/24/outline'
import { cn } from '@lib/utils'
import IntercomButton from '@components/common/IntercomButton'

interface Props {
  renderTrigger: React.ReactNode | (() => React.ReactNode)
}

const MobileNavigation = ({ renderTrigger }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {typeof renderTrigger === 'function' ? renderTrigger() : renderTrigger}
      </SheetTrigger>

      <SheetContent
        side="left"
        close="light"
        className="p-0 border-r-0 overflow-auto"
      >
        <SheetHeader className="text-left bg-midnight p-4 text-white">
          <h2 className="text-lg font-medium leading-none">
            <span className="text-xs font-semibold">Browse</span> <br />{' '}
            {COMPANY_NAME}
          </h2>
        </SheetHeader>

        <nav className="grid gap-6 px-4 py-6">
          <Section>
            <NavLink
              href={routes.internal.home.href()}
              className="flex flex-row justify-between items-center font-semibold text-lg"
            >
              <span>{COMPANY_NAME} Home</span> <HomeIcon className="w-5 h-5" />
            </NavLink>
          </Section>

          <hr />

          <Section title="Our Services" href={routes.internal.solutions.href()}>
            <NavLink href={routes.internal.solutions.distribution.href()}>
              Fulfillment & Dropshipping
            </NavLink>

            <NavLink
              external
              href={routes.external.support.features.ecommerceFulfillment.href()}
            >
              Online Stores & eCommerce
            </NavLink>

            <NavLink
              external
              href={routes.external.support.features.teamStores.href()}
            >
              Online Group Ordering
            </NavLink>

            <NavLink href={routes.internal.solutions.design.href()}>
              Free Professional Design
            </NavLink>

            <NavLink href={routes.internal.solutions.swagBox.href()}>
              Swag Bags & Unboxing Experiences
            </NavLink>
          </Section>

          <hr />

          <Section title="Learning">
            <NavLink href={routes.internal.blog.href()}>Stitchi Blog</NavLink>
            <NavLink href={routes.internal.glossary.href()}>
              Merch Directory
            </NavLink>

            <NavLink href={routes.internal.learn.show.referralPrograms.href()}>
              Referral Program Automation
            </NavLink>
          </Section>

          <hr />

          <Section title="Resources">
            <NavLink href={routes.external.support.href()} target="_blank">
              Help Center
            </NavLink>

            <NavLink href={routes.internal.lookbook.href()}>
              Design Lookbook
            </NavLink>

            <NavLink href={routes.internal.partners.href()}>Partners</NavLink>

            <IntercomButton
              as={
                <SheetClose asChild>
                  <button className="text-left text-base font-regular hover:underline underline-offset-4">
                    Talk to a Merch Expert
                  </button>
                </SheetClose>
              }
            />
          </Section>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

const Section = ({
  children,
  title,
  href,
}: {
  children: React.ReactNode
  title?: string
  href?: string
}) => {
  const TitleComponent = href ? (
    <SheetClose asChild>
      <Link href={href} className="text-lg font-semibold hover:underline">
        {title}
      </Link>
    </SheetClose>
  ) : (
    <h3 className="text-lg font-semibold">{title}</h3>
  )
  return (
    <div className="grid gap-4">
      {title ? TitleComponent : null}

      <ul className="grid gap-4">{children}</ul>
    </div>
  )
}

const NavLink = ({
  external,
  ...props
}: {
  href: string
  children: React.ReactNode
  target?: string
  className?: string
  external?: boolean
}) => {
  return (
    <li>
      <SheetClose asChild>
        <Link
          {...props}
          target={external ? '_blank' : undefined}
          className={cn(
            'text-base font-regular hover:underline underline-offset-4',
            props.className,
          )}
        />
      </SheetClose>
    </li>
  )
}

export default MobileNavigation
