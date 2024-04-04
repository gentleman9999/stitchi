import React from 'react'
import cx from 'classnames'
import Navigation from './Navigation'
import { getSession } from '@auth0/nextjs-auth0'

interface Props {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mb-auto relative">{children}</main>
    </div>
  )
}

export default Layout
