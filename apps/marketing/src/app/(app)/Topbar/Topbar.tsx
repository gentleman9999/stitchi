import React from 'react'
import LogoButton from './LogoButton'

import Logo from '@components/ui/Logo'
import Container from '@components/ui/Container'
import Button from '@components/ui/ButtonV2/Button'

import routes from '@lib/routes'
import Link from 'next/link'

import NotificationsButton from './NotificationsButton'
import AppTopbarUser from '../../AppTopbarUser'
import { getSession } from '@auth0/nextjs-auth0'
import SupportButton from './SupportButton'
import cx from 'classnames'
import { track } from '@lib/analytics'

interface Props {}

const Topbar = async (props: Props) => {
  const session = await getSession()
  return (
    <nav className="fixed top-0 bg-paper w-full z-10 h-topbar-height border-b flex items-center">
      <Container className="max-w-none flex items-center justify-between py-2">
        <div className="md:hidden">
          <LogoButton>
            <Logo className="h-8" />
          </LogoButton>
        </div>

        <div className="hidden md:block">
          <Link href={routes.internal.home.href()}>
            <Logo className="h-8" />
          </Link>
        </div>

        <ul className="flex gap-2 sm:gap-4 items-center">
          <Item>
            <NotificationsButton />
          </Item>

          <Item
            className={cx('hidden sm:block', {
              block: session,
            })}
          >
            <SupportButton />
          </Item>

          {session ? (
            <Item>
              <AppTopbarUser />
            </Item>
          ) : (
            <>
              <Item>
                <Button
                  variant="ghost"
                  Component={Link}
                  href={routes.internal.login.href()}
                >
                  Login
                </Button>
              </Item>
              <Item>
                <Button
                  color="brandPrimary"
                  Component={Link}
                  href={routes.internal.signup.href()}
                  onClick={() => {
                    track.signupCtaClicked({
                      ctaType: 'navigation',
                      locationHref: window.location.href,
                    })
                  }}
                >
                  Sign up
                </Button>
              </Item>
            </>
          )}
        </ul>
      </Container>
    </nav>
  )
}

const Item = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <li className={className}>{children}</li>
}

export default Topbar
