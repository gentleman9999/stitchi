'use client'

import { Container } from '@/components/ui'
import { Logo } from '@/components/ui'
import routes from '@/lib/routes'
import PaperPlane from 'icons/src/PaperPlane'
import Link from 'next/link'
import cx from 'classnames'
import React from 'react'
import SubscribeOverlay from './SubscribeOverlay'
import { usePathname } from 'next/navigation'
import * as Popover from '@radix-ui/react-popover'
import { HamburgerMenu } from 'icons'
import MobileDropdown from './MobileDropdown'

interface Props {}

const PrimaryNavigation = ({}: Props) => {
  const pathname = usePathname()

  const [isOverlayOpen, setIsOverlayOpen] = React.useState(false)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const reset = React.useCallback(() => {
    setIsOverlayOpen(false)
    setIsMenuOpen(false)
  }, [])

  React.useEffect(() => {
    if (pathname) {
      reset()
    }
  }, [pathname, reset])

  return (
    <Popover.Root modal open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <Popover.Anchor asChild>
        <nav className="sticky top-0 z-10">
          <div className="bg-paper border-b">
            <Container className="relative">
              <div className="py-2 grid grid-cols-2 md:grid-cols-3">
                <ul className="hidden md:flex col-span-1 items-center gap-8">
                  {/* <NavLink
                    label="Directory"
                    href={routes.internal.directory.href()}
                  /> */}
                  <NavLink label="Home" href={routes.internal.home.href()} />
                  <NavLink
                    label="Issues"
                    href={routes.internal.newsletter.href()}
                  />
                </ul>

                <div className="col-span-1 flex items-center md:justify-center">
                  <Link href={routes.internal.home.href()}>
                    <Logo variant="textLogo" width={200} />
                  </Link>
                </div>

                <div className="col-span-1 flex items-center justify-end gap-8">
                  <div className="flex items-center gap-4">
                    <button
                      className={cx(
                        'hidden sm:flex border-2 border-black text-black rounded-md font-semibold py-1 px-2 gap-1 items-center',
                        { '!hidden': isMenuOpen },
                      )}
                      onClick={() => setIsOverlayOpen(prev => !prev)}
                    >
                      Subscribe{' '}
                      <PaperPlane
                        height={16}
                        strokeWidth={2}
                        className={cx('transition-all', {
                          'rotate-90': isOverlayOpen,
                        })}
                      />
                    </button>

                    <Popover.Trigger className="p-2 text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-100">
                      <span className="sr-only">Open main menu</span>
                      <HamburgerMenu
                        height={20}
                        width={20}
                        className="fill-gray-600"
                      />
                    </Popover.Trigger>
                  </div>
                </div>
              </div>
            </Container>
          </div>

          {isOverlayOpen && !isMenuOpen ? (
            <div className="absolute translate-y-1 left-0 right-0 hidden sm:block">
              <Container className="flex justify-end">
                <SubscribeOverlay onSubmit={() => setIsOverlayOpen(false)} />
              </Container>
            </div>
          ) : null}
        </nav>
      </Popover.Anchor>

      <Popover.Portal>
        <div>
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-gray-900 opacity-10" />
          <Popover.Content
            side="top"
            sideOffset={4}
            align="start"
            className="w-[var(--radix-popover-trigger-width)]"
          >
            <Container>
              <MobileDropdown />
            </Container>
          </Popover.Content>
        </div>
      </Popover.Portal>
    </Popover.Root>
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
