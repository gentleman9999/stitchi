'use client'

import React from 'react'
import navigation from '@lib/navigation'
import NavbarMobile from './NavbarMobile'
import NavbarDesktop from './NavbarDesktop'
import NavbarRoot from './NavbarRoot'

const nav = navigation.makeNavigation()

interface Props {}

const Navbar = ({}: Props) => {
  const [dropdownAchor, setDropdownAnchor] =
    React.useState<HTMLDivElement | null>(null)

  return (
    <NavbarRoot innerRef={setDropdownAnchor}>
      <div className="flex items-center flex-1 justify-end">
        <div className="block lg:hidden">
          <NavbarMobile anchorEl={dropdownAchor} navigation={nav} />
        </div>
        <div className="hidden lg:block">
          <NavbarDesktop anchorEl={dropdownAchor} />
        </div>
      </div>
    </NavbarRoot>
  )
}

export default Navbar
