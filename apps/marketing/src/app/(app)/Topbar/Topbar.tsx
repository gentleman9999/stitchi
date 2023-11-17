import React from 'react'
import LogoButton from './LogoButton'

import Logo from '@components/ui/Logo'
import Container from '@components/ui/Container'
import Button from '@components/ui/ButtonV2/Button'

import routes from '@lib/routes'
import Link from 'next/link'

import NotificationsButton from './NotificationsButton'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import AppTopbarUser from './AppTopbarUser'

interface Props {}

const Topbar = (props: Props) => {
  return (
    <nav className="fixed top-0 bg-paper w-full z-10 h-topbar-height border-b flex items-center">
      <Container className="max-w-none flex items-center justify-between py-2">
        <div className="md:hidden">
          <LogoButton>
            <Logo className="h-10" />
          </LogoButton>
        </div>

        <div className="hidden md:block">
          <Link href={routes.internal.home.href()}>
            <Logo className="h-10" />
          </Link>
        </div>

        <ul className="flex gap-4">
          <Item>
            <NotificationsButton />
          </Item>

          <Item>
            <Button
              variant="ghost"
              Component={Link}
              href={routes.external.support.href()}
              startIcon={<QuestionMarkCircleIcon className="w-4 h-4" />}
              {...{ target: '_blank' }}
            >
              Support
            </Button>
          </Item>

          <Item>
            <AppTopbarUser />
          </Item>
        </ul>
      </Container>
    </nav>
  )
}

const Item = ({ children }: { children: React.ReactNode }) => {
  return <li className="flex">{children}</li>
}

export default Topbar
