import React from 'react'
import { WishlistProvider } from './wishlist-context'
import Breadcrumbs from './Breadcrumbs'
import Title from './Title'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <WishlistProvider>
      <div className="flex flex-col gap-4 pt-4">
        <Breadcrumbs />
        <Title />
        <div>{children}</div>
      </div>
    </WishlistProvider>
  )
}

export default Layout
