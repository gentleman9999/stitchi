import { ChevronDown, HamburgerMenu } from 'icons'
import React from 'react'
import NextLink from 'next/link'
import s from './NavbarMobile.module.css'
import { Navigation } from '@lib/navigation'
import routes from '@lib/routes'
import { Badge, Button } from '@components/ui'
import cx from 'classnames'
import NavbarMobileDropdown from './NavbarMobileDropdown'
import Popover from './Popover'
import { Popover as HeadlessPopover } from '@headlessui/react'
import { track } from '@lib/analytics'
import { useUser } from '@auth0/nextjs-auth0/client'

interface Props {
  anchorEl: HTMLElement | null
  navigation: Navigation
}

const NavbarMobile = ({ anchorEl, navigation }: Props) => {
  const { user } = useUser()

  return (
    <Popover
      anchorEl={anchorEl}
      ButtonChildren={() => <HamburgerMenu height={24} width={24} />}
      panelChildren={
        <>
          <div className={s.item}>
            <NavbarMobileDropdown
              ButtonChildren={({ active }) => (
                <div className={s.link}>
                  Services
                  <span
                    className={cx('ml-2 transition', {
                      'transform rotate-180': active,
                    })}
                  >
                    <ChevronDown />
                  </span>
                </div>
              )}
              items={navigation.services.map(item => {
                // https://headlessui.dev/react/menu#integrating-with-next-js
                // eslint-disable-next-line react/display-name
                return function (props: any) {
                  return (
                    <HeadlessPopover.Button
                      {...props}
                      key={item.label}
                      href={item.href}
                      as={Link}
                      className={cx('block text-lg text-secondary', {})}
                    >
                      <div>{item.label}</div>
                    </HeadlessPopover.Button>
                  )
                }
              })}
            />
          </div>
          <div className={s.item}>
            <NavbarMobileDropdown
              ButtonChildren={({ active }) => (
                <div className={s.link}>
                  Solutions
                  <span
                    className={cx('ml-2 transition', {
                      'transform rotate-180': active,
                    })}
                  >
                    <ChevronDown />
                  </span>
                </div>
              )}
              items={navigation.solutions.map(item => {
                const disabled = Boolean(item.beta)
                // https://headlessui.dev/react/menu#integrating-with-next-js
                // eslint-disable-next-line react/display-name
                return function (props: any) {
                  return (
                    <HeadlessPopover.Button
                      {...props}
                      key={item.label}
                      href={item.href}
                      as={Link}
                      disabled={disabled}
                      className={cx('block text-lg text-secondary', {
                        'pointer-events-none': disabled,
                      })}
                    >
                      <div>
                        {item.label}
                        {disabled && <Badge size="small" label="Coming soon" />}
                      </div>
                    </HeadlessPopover.Button>
                  )
                }
              })}
            />
          </div>
          <div className={s.item}>
            <NavbarMobileDropdown
              ButtonChildren={({ active }) => (
                <div className={s.link}>
                  Learn
                  <span
                    className={cx('ml-2 transition', {
                      'transform rotate-180': active,
                    })}
                  >
                    <ChevronDown />
                  </span>
                </div>
              )}
              items={navigation.resources.map(item => {
                if (
                  [
                    routes.internal.catalog.href(),
                    routes.external.careers.href(),
                  ].includes(item.href)
                ) {
                  return () => null
                }
                // https://headlessui.dev/react/menu#integrating-with-next-js
                // eslint-disable-next-line react/display-name
                return function (props: any) {
                  return (
                    <HeadlessPopover.Button
                      {...props}
                      key={item.label}
                      href={item.href}
                      as={Link}
                      className={cx('block text-lg text-secondary')}
                    >
                      {item.label}
                    </HeadlessPopover.Button>
                  )
                }
              })}
            />
          </div>
          <div className={s.item}>
            <Link href={routes.internal.catalog.href()}>
              <HeadlessPopover.Button className={s.link}>
                Catalog
              </HeadlessPopover.Button>
            </Link>
          </div>

          {!user ? (
            <div className={s.item}>
              <Link
                href={routes.internal.login.href({
                  returnTo: routes.internal.closet.href(),
                })}
              >
                <HeadlessPopover.Button className={s.link}>
                  Login
                </HeadlessPopover.Button>
              </Link>
            </div>
          ) : null}

          <div className={s.item}>
            <Link
              href={
                user
                  ? routes.internal.getStarted.href()
                  : routes.internal.signup.href()
              }
            >
              <HeadlessPopover.Button as="div">
                <Button
                  bold
                  shadow
                  color="brandPrimary"
                  className="w-full"
                  onClick={() => {
                    track.navbarCtaCliced({ view: 'mobile' })
                  }}
                >
                  {user ? 'My closet' : 'Get started'}
                </Button>
              </HeadlessPopover.Button>
            </Link>
          </div>
        </>
      }
    />
  )
}

// https://headlessui.com/react/menu#integrating-with-next-js

const Link = React.forwardRef<
  HTMLAnchorElement,
  { href: string; children: React.ReactNode; [key: string]: any }
>((props, ref) => {
  let { href, children, ...rest } = props
  return (
    <NextLink href={href} ref={ref} {...rest}>
      {children}
    </NextLink>
  )
})

Link.displayName = 'Link'

export default NavbarMobile
