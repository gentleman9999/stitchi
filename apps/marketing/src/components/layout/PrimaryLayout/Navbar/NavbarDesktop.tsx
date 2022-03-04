import React from 'react'
import Link from 'next/link'
import routes from '@lib/routes'
import { Navigation } from '@lib/navigation'
import { Button } from 'ui'
import s from './NavbarDesktop.module.css'
import { ArrowRight } from 'icons'

interface Props {
  anchorEl: HTMLElement | null
  navigation: Navigation
}

const NavbarDesktop = ({ anchorEl, navigation }: Props) => {
  return (
    <nav className="space-x-10">
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
