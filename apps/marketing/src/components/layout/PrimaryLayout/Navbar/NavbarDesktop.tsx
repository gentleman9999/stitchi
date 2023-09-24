import React from 'react'
import Link from 'next/link'
import routes from '@lib/routes'
import { Navigation } from '@lib/navigation'
import { Button } from '@components/ui'
import s from './NavbarDesktop.module.css'
import { ChevronDown } from 'icons'
import cx from 'classnames'
import Popover from '../../Popover'
import NavbarDesktopDropdown from './NavbarDesktopDropdown'
import NavbarDesktopLearnContents from './NavbarDesktopLearnContents'
import { Popover as RuiPopover } from '@headlessui/react'
import { track } from '@lib/analytics'
import { useUser } from '@auth0/nextjs-auth0/client'

interface Props {
  anchorEl: HTMLElement | null
  navigation: Navigation
}

const NavbarDesktop = ({ anchorEl, navigation }: Props) => {
  const { user } = useUser()

  return (
    <nav className="space-x-10">
      <RuiPopover.Group className="space-x-10 inline-flex">
        <Popover
          anchorEl={anchorEl}
          ButtonChildren={({ active }) => (
            <PopoverButton label="Services" active={active} />
          )}
          panelChildren={
            <div className="grid grid-cols-2 gap-4">
              {navigation.services.map(item => (
                <NavbarDesktopDropdown
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  description={item.description}
                  // icon={item.icon}
                />
              ))}
            </div>
          }
        />
        <Popover
          anchorEl={anchorEl}
          ButtonChildren={({ active }) => (
            <PopoverButton label="Solutions" active={active} />
          )}
          panelChildren={
            <div className="grid grid-cols-2 gap-4">
              {navigation.solutions.map(item => (
                <NavbarDesktopDropdown
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  description={item.description}
                  beta={item.beta}
                />
              ))}
            </div>
          }
        />

        <Popover
          anchorEl={anchorEl}
          ButtonChildren={({ active }) => (
            <PopoverButton active={active} label="Resources" />
          )}
          panelChildren={<NavbarDesktopLearnContents />}
        />
      </RuiPopover.Group>

      <Link href={routes.internal.catalog.href()} passHref className={s.link}>
        Catalog
      </Link>

      {!user ? (
        <Link
          href={routes.internal.login.href({
            returnTo: routes.internal.closet.href(),
          })}
          passHref
          className={s.link}
        >
          Login
        </Link>
      ) : null}

      <Button
        bold
        Component={Link}
        color="primary"
        className="!border-2 !py-1 !px-2 !border-gray-800 !lowercase"
        variant="ghost"
        slim
        href={
          user
            ? routes.internal.getStarted.href()
            : routes.internal.signup.href()
        }
        onClick={() => {
          track.navbarCtaCliced({ view: 'desktop' })
        }}
      >
        {user ? 'My closet' : 'Get started'}
      </Button>
    </nav>
  )
}

const PopoverButton = ({
  label,
  active,
}: {
  label: string
  active: boolean
}) => (
  <div className={s.link}>
    {label}
    <ChevronDown
      strokeWidth="4px"
      className={cx(
        '-mr-1 ml-2 mt-0.5 h-3 w-3 transition-transform text-gray-800',
        active && 'transform rotate-180',
      )}
      aria-hidden="true"
    />
  </div>
)

export default NavbarDesktop
