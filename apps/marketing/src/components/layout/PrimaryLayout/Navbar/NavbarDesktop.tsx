import React from 'react'
import Link from 'next/link'
import routes from '@lib/routes'
import { Navigation } from '@lib/navigation'
import { Button } from '@components/ui'
import s from './NavbarDesktop.module.css'
import { ChevronDown } from 'icons'
import cx from 'classnames'
import Popover from './Popover'
import NavbarDesktopDropdown from './NavbarDesktopDropdown'

interface Props {
  anchorEl: HTMLElement | null
  navigation: Navigation
}

const NavbarDesktop = ({ anchorEl, navigation }: Props) => {
  return (
    <nav className="space-x-10">
      <Popover
        anchorEl={anchorEl}
        ButtonChildren={({ active }) => (
          <div className={s.link}>
            Services
            <ChevronDown
              className={cx(
                '-mr-1 ml-2 h-5 w-5 transition-transform',
                active && 'transform rotate-180',
              )}
              aria-hidden="true"
            />
          </div>
        )}
        panelChildren={
          <div className="grid grid-cols-3 gap-4">
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

      <Link href={routes.internal.catalog.href()} passHref>
        <a className={s.link}>Catalog</a>
      </Link>
      <Link href={routes.internal.blog.href()} passHref>
        <a className={s.link}>Learn</a>
      </Link>

      <Link href={routes.internal.customers.morningBrew.href()} passHref>
        <a className={s.link}>Case study</a>
      </Link>

      <Link href={routes.internal.getStarted.href()} passHref>
        <Button
          bold
          Component="a"
          className="!py-1 !px-4 !lowercase !rounded-2xl"
          color="primary"
        >
          start here
        </Button>
      </Link>
    </nav>
  )
}

export default NavbarDesktop
