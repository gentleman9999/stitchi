import React from 'react'
import { WishlistProvider } from './wishlist-context'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return <WishlistProvider>{children}</WishlistProvider>
}

export default Layout
