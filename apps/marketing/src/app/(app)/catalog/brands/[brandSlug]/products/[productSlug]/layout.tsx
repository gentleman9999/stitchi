import Container from '@components/ui/Container'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return <Container className="max-w-none">{children}</Container>
}

export default Layout
