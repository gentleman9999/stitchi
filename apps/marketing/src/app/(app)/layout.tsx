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
import { AppLayoutContextProvider } from './app-layout-context'
import LogoButton from './LogoButton'

interface Props {
  children: React.ReactNode
}
const Layout = async ({ children }: Props) => {
  return (
    <main>
      <nav className="fixed top-0 bg-paper w-full z-10 h-topbar-height border-b flex items-center">
        <Container className="max-w-none flex items-center justify-between py-2">
          <div className="md:hidden">
            <LogoButton>
              <Logo className="h-10" />
            </LogoButton>
          </div>

          <div className="hidden md:block">
            <Logo className="h-10" />
          </div>

          <ul className="flex gap-3">
            <Item>
              <Button
                Component={Link}
                href={routes.internal.closet.inbox.href()}
                variant="ghost"
              >
                <BellAlertIcon className="w-4 h-4" />
              </Button>
            </Item>

            <Item>
              <Button
                variant="ghost"
                Component={Link}
                href={routes.external.support.href()}
              >
                Support
              </Button>
            </Item>

            <Item>
              <TopbarUser />
            </Item>
          </ul>
        </Container>
      </nav>

      <main>{children}</main>
    </main>
  )
}

const Item = ({ children }: { children: React.ReactNode }) => {
  return <li className="flex">{children}</li>
}

const withAppLayoutContext = (Component: React.ComponentType<Props>) => {
  const ComponentWithAppLayoutContent = (props: any) => {
    return (
      <AppLayoutContextProvider>
        <Component {...props} />
      </AppLayoutContextProvider>
    )
  }

  return ComponentWithAppLayoutContent
}

export default withAppLayoutContext(Layout)
