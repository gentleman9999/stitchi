import React, { FC } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import { Logo } from 'ui'
import routes from '@lib/routes'
import NavbarRoot from './NavbarRoot'
import navigation from '@lib/navigation'
import dynamic from 'next/dynamic'

const nav = navigation.makeNavigation()

const NavbarMobile = dynamic(() => import('./NavbarMobile'))
const NavbarDesktop = dynamic(() => import('./NavbarDesktop'))

const Navbar: FC = () => {
  const dropdownAchor = React.useRef<HTMLDivElement>(null)

  return (
    <NavbarRoot innerRef={dropdownAchor}>
      <div className={s.nav}>
        <Link href={routes.internal.home.href()} passHref>
          <a className="contents">
            <Logo className={s.logo} />
          </a>
        </Link>
        <div className="flex items-center flex-1 justify-end">
          <div className="lg:hidden">
            <NavbarMobile anchorEl={dropdownAchor.current} navigation={nav} />
          </div>
          <div className="hidden lg:block">
            <NavbarDesktop anchorEl={dropdownAchor.current} navigation={nav} />
          </div>
        </div>
      </div>
    </NavbarRoot>
  )
}

export default Navbar
