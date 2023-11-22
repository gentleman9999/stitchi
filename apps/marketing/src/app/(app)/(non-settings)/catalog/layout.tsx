import React from 'react'
import { WishlistProvider } from './wishlist-context'
import Breadcrumbs from './Breadcrumbs'
import { FiltersProvider } from './filters-context'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <FiltersProvider>
      <WishlistProvider>
        <div className="relative flex flex-col gap-4 py-4 bg-paper">
          <Breadcrumbs />

          {children}
        </div>
      </WishlistProvider>
    </FiltersProvider>
  )
}

export default Layout
