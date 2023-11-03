import '@assets/main.css'
import '@assets/chrome-bug.css'

import React from 'react'

import { AppLayoutContextProvider } from './app-layout-context'
import { NotificationStandoutProvider } from './notification-standout-context'
import Topbar from './Topbar'
import { TOPBAR_NAV_HEIGTH_PX } from '@lib/constants'

const availableHeight = `calc(100vh-${TOPBAR_NAV_HEIGTH_PX}px)`

interface Props {
  children: React.ReactNode
}
const Layout = async ({ children }: Props) => {
  return (
    <AppLayoutContextProvider>
      <NotificationStandoutProvider>
        <div className="relative h-full">
          <Topbar />

          <main
            className={`min-h-[${availableHeight}] mt-[${TOPBAR_NAV_HEIGTH_PX}px] relative`}
          >
            {children}
          </main>
        </div>
      </NotificationStandoutProvider>
    </AppLayoutContextProvider>
  )
}

export default Layout
