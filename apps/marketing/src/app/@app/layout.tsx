import React from 'react'
import { AppLayoutContextProvider } from './app-layout-context'
import { NotificationStandoutProvider } from './notification-standout-context'
import Topbar from './Topbar'
import { WishlistProvider } from './wishlist-context'

interface Props {
  children: React.ReactNode
  catalog: React.ReactNode
  catalogProduct: React.ReactNode
}
const Layout = ({ children, catalog, catalogProduct }: Props) => {
  return (
    <AppLayoutContextProvider>
      <NotificationStandoutProvider>
        <WishlistProvider>
          <div className="relative h-full">
            <Topbar />

            <main
              className={`min-h-[calc(100vh-var(--topbar-height))] mt-topbar-height relative`}
            >
              {children}
              {catalog}
              {catalogProduct}
            </main>
          </div>
        </WishlistProvider>
      </NotificationStandoutProvider>
    </AppLayoutContextProvider>
  )
}

export default Layout
