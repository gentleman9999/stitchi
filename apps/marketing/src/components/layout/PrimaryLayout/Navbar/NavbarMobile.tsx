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

interface Props {
  anchorEl: HTMLElement | null
  navigation: Navigation
}

const NavbarMobile = ({ anchorEl, navigation }: Props) => {
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
              items={navigation.solutions.map(item => {
                const disabled = Boolean(item.beta)
                // https://headlessui.dev/react/menu#integrating-with-next-js
                // eslint-disable-next-line react/display-name
                return function (props: any) {
                  return (
                    <Link href={item.href} key={item.label}>
                      <HeadlessPopover.Button
                        as="a"
                        disable={disabled}
                        {...props}
                        className={cx('block mb-2 text-lg text-secondary', {
                          'pointer-events-none': disabled,
                        })}
                      >
                        {item.label}
                        {disabled && <Badge size="small" label="Coming soon" />}
                      </HeadlessPopover.Button>
                    </Link>
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
                if (item.href === routes.internal.catalog.href()) {
                  return () => null
                }
                // https://headlessui.dev/react/menu#integrating-with-next-js
                // eslint-disable-next-line react/display-name
                return function (props: any) {
                  return (
                    <Link href={item.href} key={item.label}>
                      <HeadlessPopover.Button
                        as="a"
                        {...props}
                        className={cx('block mb-2 text-lg text-secondary')}
                      >
                        {item.label}
                      </HeadlessPopover.Button>
                    </Link>
                  )
                }
              })}
            />
          </div>
          <div className={s.item}>
            <Link href={routes.internal.catalog.href()} passHref>
              <HeadlessPopover.Button as="a" className={s.link}>
                Catalog
              </HeadlessPopover.Button>
            </Link>
          </div>

          <div className={s.item}>
            <Link href={routes.internal.getStarted.href()} passHref>
              <HeadlessPopover.Button as="div">
                <Button
                  Component={(props: any) => (
                    <Button
                      {...props}
                      bold
                      shadow
                      Component="a"
                      color="brandPrimary"
                      className="w-full"
                    />
                  )}
                >
                  Talk to us
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
    <NextLink href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </NextLink>
  )
})

Link.displayName = 'Link'

export default NavbarMobile
