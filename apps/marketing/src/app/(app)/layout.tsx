import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

interface Props {
  children: React.ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href={routes.internal.closet.href()}>Closet</Link>
          </li>
          <li>
            <Link href={routes.internal.catalog.href()}>Catalog</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  )
}

export default Layout
