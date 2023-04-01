import { Container } from '@/components/ui'
import { Logo } from '@/components/ui'
import routes from '@/lib/routes'
import Link from 'next/link'
import React from 'react'

interface Props {}

const PrimaryNavigation = ({}: Props) => {
  return (
    <nav className="sticky top-0 bg-paper z-10 border-b">
      <Container className="py-2 grid grid-cols-3">
        <div className="col-span-1 flex items-center translate-y-1">
          <Link href={routes.internal.home.href()}>
            <Logo variant="textLogo" width={150} />
          </Link>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <Link href={routes.internal.home.href()}>
            <Logo width={30} />
          </Link>
        </div>

        <ul className="col-span-1 flex items-center justify-end gap-8">
          <NavLink label="Directory" href={routes.internal.directory.href()} />
          <NavLink
            label="Newsletter"
            href={routes.internal.newsletter.href()}
          />
        </ul>
      </Container>
    </nav>
  )
}

const NavLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <li>
      <Link href={href} className="font-bold font text-2xl font-headingDisplay">
        {label}
      </Link>
    </li>
  )
}

export default PrimaryNavigation
