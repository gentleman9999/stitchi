import React from 'react'
import { AppLayoutContextProvider } from './app-layout-context'
import { NotificationStandoutProvider } from './notification-standout-context'
import Topbar from './Topbar'

interface Props {
  children: React.ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <AppLayoutContextProvider>
      <NotificationStandoutProvider>
        <div className="relative h-full">
          <Topbar />

          <main
            className={`min-h-[calc(100vh-var(--topbar-height))] mt-topbar-height relative z-0`}
          >
            {children}
          </main>
        </div>
      </NotificationStandoutProvider>
    </AppLayoutContextProvider>
  )
}

export default Layout
