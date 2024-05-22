import Container from '@components/ui/Container'
import Logo from '@components/ui/Logo'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white border-b py-2 z-40">
        <Container>
          <Link href={routes.internal.home.href()}>
            <Logo className="h-9" />
          </Link>
        </Container>
      </div>
      {children}
    </>
  )
}

export default Layout
