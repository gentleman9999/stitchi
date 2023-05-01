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

      <Link href={routes.internal.getStarted.href()} passHref legacyBehavior>
        <Button
          bold
          Component="a"
          color="primary"
          className="!border-2 !py-1 !px-2 !border-gray-800 !lowercase"
          variant="ghost"
          slim
        >
          Work with us
        </Button>
      </Link>
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
      className={cx(
        '-mr-1 ml-2 h-5 w-5 transition-transform',
        active && 'transform rotate-180',
      )}
      aria-hidden="true"
    />
  </div>
)

export default NavbarDesktop
