import React from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import { Logo } from '@components/ui'
import routes from '@lib/routes'
import NavbarRoot from './NavbarRoot'
import navigation from '@lib/navigation'
import dynamic from 'next/dynamic'
import cx from 'classnames'

const nav = navigation.makeNavigation()

const NavbarMobile = dynamic(() => import('./NavbarMobile'))
const NavbarDesktop = dynamic(() => import('./NavbarDesktop'))

interface Props {}

const Navbar = ({}: Props) => {
  const [dropdownAchor, setDropdownAnchor] =
    React.useState<HTMLDivElement | null>(null)

  const [shrink, setShrink] = React.useState(false)

  React.useEffect(() => {
    let prevScrollPos = 0

    const handleScroll = () => {
      if (window.scrollY > prevScrollPos + 10) {
        setShrink(true)
        prevScrollPos = window.scrollY
      } else if (window.scrollY < prevScrollPos - 5) {
        setShrink(false)
        prevScrollPos = window.scrollY
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <NavbarRoot innerRef={setDropdownAnchor}>
      <div className={cx(s.nav, { [s.shrink]: shrink })}>
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
