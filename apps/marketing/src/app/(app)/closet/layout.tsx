import React from 'react'

interface Props {
  children: React.ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <div>
      <nav>test</nav>

      <main>{children}</main>
    </div>
  )
}

export default Layout
