import '@assets/main.css'
import '@assets/chrome-bug.css'

import React from 'react'

import { AppLayoutContextProvider } from './app-layout-context'
import { NotificationStandoutProvider } from './notification-standout-context'
import Topbar from './Topbar'

interface Props {
  children: React.ReactNode
}
const Layout = async ({ children }: Props) => {
  return (
    <AppLayoutContextProvider>
      <NotificationStandoutProvider>
        <div className="relative h-full">
          <Topbar />
          {children}
        </div>
      </NotificationStandoutProvider>
    </AppLayoutContextProvider>
  )
}

export default Layout
