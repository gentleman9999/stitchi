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
            <NavLink href={routes.internal.solutions.design.href()}>
              Work with a Designer
            </NavLink>
            <NavLink href={routes.internal.solutions.customization.href()}>
              Bulk Orders
            </NavLink>
            <NavLink href={routes.internal.solutions.distribution.href()}>
              Express Delivery
            </NavLink>
            <NavLink href={routes.internal.solutions.swagBox.href()}>
              Unwrapping Experiences
            </NavLink>
          </Section>

          <hr />

          <Section title="Learning & Resources">
            <NavLink href={routes.internal.blog.href()}>Blog</NavLink>
            <NavLink href={routes.internal.glossary.href()}>
              Promotional Products Directory
            </NavLink>
            <NavLink href={routes.internal.lookbook.href()}>
              Design Lookbook
            </NavLink>
            <NavLink href={routes.external.support.href()} target="_blank">
              Support
            </NavLink>
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

const NavLink = (props: {
  href: string
  children: React.ReactNode
  target?: string
  className?: string
}) => {
  return (
    <li>
      <SheetClose asChild>
        <Link
          {...props}
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
