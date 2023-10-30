import '@assets/main.css'
import '@assets/chrome-bug.css'

import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

import Logo from '@components/ui/Logo'
import Container from '@components/ui/Container'
import Button from '@components/ui/ButtonV2/Button'
import { BellAlertIcon } from '@heroicons/react/20/solid'

import TopbarUser from './TopbarUser'

interface Props {
  children: React.ReactNode
}
const Layout = async ({ children }: Props) => {
  return (
    <main>
      <nav className="fixed top-0 py-2 bg-paper w-full z-10 h-topbar-height border-b">
        <Container className="max-w-none h-full flex items-center justify-between py-1">
          <Logo className="h-10" />

          <ul className="flex gap-3">
            <li>
              <Link href={routes.internal.closet.href()}>Closet</Link>
            </li>
            <li>
              <Link href={routes.internal.catalog.href()}>Catalog</Link>
            </li>

            <li>
              <Button
                href={routes.internal.closet.inbox.href()}
                variant="ghost"
              >
                <BellAlertIcon className="w-4 h-4" />
              </Button>
            </li>

            <li>
              <Button
                variant="ghost"
                Component={Link}
                href={routes.external.support.href()}
              >
                Support
              </Button>
            </li>

            <li>
              <TopbarUser />
            </li>
          </ul>
        </Container>
      </nav>

      <main>{children}</main>
    </main>
  )
}

export default Layout
