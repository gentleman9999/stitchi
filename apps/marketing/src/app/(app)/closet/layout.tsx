import { TOPBAR_NAV_HEIGTH_PX } from '@lib/constants'
import React from 'react'

const availableHeight = `calc(100vh-${TOPBAR_NAV_HEIGTH_PX}px)`

interface Props {
  children: React.ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <div
      className={`min-h-[${availableHeight}] mt-[${TOPBAR_NAV_HEIGTH_PX}px] relative md:pl-64`}
    >
      <nav
        className={`fixed h-[${availableHeight}] left-0 top-[${TOPBAR_NAV_HEIGTH_PX}px] border-r bg-paper w-0 md:w-64 z-10 overflow-scroll flex flex-col`}
      >
        test
      </nav>

      <main
        className={`overflow-auto w-full z-0 bg-gray-50 min-h-[${availableHeight}] relative`}
      >
        {children}
      </main>
    </div>
  )
}

export default Layout
