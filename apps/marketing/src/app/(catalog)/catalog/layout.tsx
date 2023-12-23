import React from 'react'
import { WishlistProvider } from './wishlist-context'
import Breadcrumbs from './Breadcrumbs'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <WishlistProvider>
      <div className="relative flex flex-col gap-4 py-4 bg-paper">
        <Breadcrumbs />

        {children}
      </div>
    </WishlistProvider>
  )
}

export default Layout
