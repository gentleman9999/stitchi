import React, { FC } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import { Logo } from '@components/ui'
import routes from '@lib/routes'
import NavbarRoot from './NavbarRoot'
import navigation from '@lib/navigation'
import dynamic from 'next/dynamic'

const nav = navigation.makeNavigation()

const NavbarMobile = dynamic(() => import('./NavbarMobile'))
const NavbarDesktop = dynamic(() => import('./NavbarDesktop'))

const Navbar: FC = () => {
  const [dropdownAchor, setDropdownAnchor] =
    React.useState<HTMLDivElement | null>(null)

  return (
    <NavbarRoot innerRef={setDropdownAnchor}>
      <div className={s.nav}>
        <Link href={routes.internal.home.href()} passHref>
          <a className="contents">
            <Logo className={s.logo} />
          </a>
        </Link>
        <div className="flex items-center flex-1 justify-end">
          <div className="block lg:hidden">
            <NavbarMobile anchorEl={dropdownAchor} navigation={nav} />
          </div>
          <div className="hidden lg:block">
            <NavbarDesktop anchorEl={dropdownAchor} navigation={nav} />
          </div>
        </div>
      </div>
    </NavbarRoot>
  )
}

export default Navbar
