import React from 'react'
import Link from 'next/link'
import routes from '@lib/routes'
import { Navigation } from '@lib/navigation'
import { Button } from '@components/ui'
import s from './NavbarDesktop.module.css'
import { ArrowRight, ChevronDown } from 'icons'
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
          Component="a"
          className="!py-1 !px-4 !font-extrabold !lowercase text-lg"
          color="brandPrimary"
        >
          <div className="flex group">
            start here{' '}
            <span className="ml-1 relative transition-all">
              <div className="invisible">
                <ArrowRight strokeWidth="4" width="15px" />
              </div>
              <span className="absolute top-0 left-0 ml-1/2 group-hover:left-1.5 duration-200">
                <ArrowRight strokeWidth="4" width="15px" />
              </span>
            </span>
          </div>
        </Button>
      </Link>
    </nav>
  )
}

export default NavbarDesktop
