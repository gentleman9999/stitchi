import React from 'react'
import Link from 'next/link'
import routes from '@lib/routes'
import Button from '@components/ui/Button'
import s from './NavbarDesktop.module.css'
import { ChevronDown } from 'icons'
import cx from 'classnames'
import Popover from '../Popover'
import NavbarDesktopLearnContents from './NavbarDesktopLearnContents'
import { Popover as RuiPopover } from '@headlessui/react'
import { track } from '@lib/analytics'
import { useUser } from '@auth0/nextjs-auth0/client'

interface Props {
  anchorEl: HTMLElement | null
}

const NavbarDesktop = ({ anchorEl }: Props) => {
  const { user } = useUser()

  return (
    <nav className="space-x-10">
      <Link href={routes.internal.features.href()} passHref className={s.link}>
        Solutions
      </Link>

      <Link href={routes.internal.catalog.href()} passHref className={s.link}>
        Catalog
      </Link>

      <RuiPopover.Group className="space-x-10 inline-flex">
        <Popover
          anchorEl={anchorEl}
          ButtonChildren={({ active }) => (
            <PopoverButton active={active} label="Resources" />
          )}
          panelChildren={<NavbarDesktopLearnContents />}
        />
      </RuiPopover.Group>

      {!user ? (
        <Link href={routes.internal.login.href()} passHref className={s.link}>
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
          user ? routes.internal.closet.href() : routes.internal.signup.href()
        }
        onClick={() => {
          track.navbarCtaCliced({ view: 'desktop' })
        }}
      >
        {user ? 'My closet' : 'Create free account'}
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
