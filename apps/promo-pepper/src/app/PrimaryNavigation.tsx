'use client'

import { Container } from '@/components/ui'
import { Logo } from '@/components/ui'
import routes from '@/lib/routes'
import PaperPlane from 'icons/src/PaperPlane'
import Link from 'next/link'
import cx from 'classnames'
import React from 'react'
import PrimaryNavigationSubscribeOverlay from './PrimaryNavigationSubscribeOverlay'
import { usePathname } from 'next/navigation'

interface Props {}

const PrimaryNavigation = ({}: Props) => {
  const pathname = usePathname()

  const [isOverlayOpen, setIsOverlayOpen] = React.useState(false)

  const reset = React.useCallback(() => {
    setIsOverlayOpen(false)
  }, [])

  React.useEffect(() => {
    if (pathname) {
      reset()
    }
  }, [pathname, reset])

  return (
    <nav className="sticky top-0 z-10">
      <div className="bg-paper border-b">
        <Container className="relative">
          <div className="py-2 grid grid-cols-3">
            <ul className="col-span-1 flex items-center gap-8">
              <NavLink
                label="Directory"
                href={routes.internal.directory.href()}
              />
              <NavLink
                label="Newsletter"
                href={routes.internal.newsletter.href()}
              />
            </ul>

            <div className="col-span-1 flex items-center justify-center">
              <Link href={routes.internal.home.href()}>
                <Logo variant="textLogo" width={150} />
              </Link>
            </div>

            <div className="col-span-1 flex items-center justify-end gap-8">
              <button
                className="bg-gray-900 text-paper rounded-md font-semibold py-1 px-2 flex gap-1 items-center"
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
            </div>
          </div>
        </Container>
      </div>
      {isOverlayOpen ? (
        <div className="absolute translate-y-1 left-0 right-0">
          <Container className="flex justify-end">
            <PrimaryNavigationSubscribeOverlay
              onSubmit={() => setIsOverlayOpen(false)}
            />
          </Container>
        </div>
      ) : null}
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
