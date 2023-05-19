import React from 'react'
import Link from 'next/link'
import routes from '@lib/routes'
import { Navigation } from '@lib/navigation'
import { Button } from '@components/ui'
import s from './NavbarDesktop.module.css'
import { ChevronDown } from 'icons'
import cx from 'classnames'
import Dropdown from './Popover'
import NavbarDesktopDropdown from './NavbarDesktopDropdown'
import NavbarDesktopLearnContents from './NavbarDesktopLearnContents'
import { Popover } from '@headlessui/react'
import { track } from '@lib/analytics'

interface Props {
  anchorEl: HTMLElement | null
  navigation: Navigation
}

const NavbarDesktop = ({ anchorEl, navigation }: Props) => {
  return (
    <nav className="space-x-10">
      <Popover.Group className="space-x-10 inline-flex">
        <Dropdown
          anchorEl={anchorEl}
          ButtonChildren={({ active }) => (
            <DropdownButton label="Services" active={active} />
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
        <Dropdown
          anchorEl={anchorEl}
          ButtonChildren={({ active }) => (
            <DropdownButton label="Solutions" active={active} />
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
                  // icon={item.icon}
                />
              ))}
            </div>
          }
        />

        <Dropdown
          anchorEl={anchorEl}
          ButtonChildren={({ active }) => (
            <DropdownButton active={active} label="Learn" />
          )}
          panelChildren={<NavbarDesktopLearnContents />}
        />
      </Popover.Group>

      <Link href={routes.internal.catalog.href()} passHref className={s.link}>
        Catalog
      </Link>

      <Button
        bold
        Component={Link}
        color="primary"
        className="!border-2 !py-1 !px-2 !border-gray-800 !lowercase"
        variant="ghost"
        slim
        href={routes.internal.getStarted.href()}
        onClick={() => {
          track.navbarCtaCliced({ view: 'desktop' })
        }}
      >
        Work with us
      </Button>
    </nav>
  )
}

const DropdownButton = ({
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
