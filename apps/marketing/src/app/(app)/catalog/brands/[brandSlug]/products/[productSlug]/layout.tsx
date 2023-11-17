import Container from '@components/ui/Container'
import React from 'react'
import ValuePropositions from './ValuePropositions'

interface Props {
  children: React.ReactNode
  share: React.ReactNode
}

const Layout = ({ children, share }: Props) => {
  return (
    <>
      {share}
      <Container className="max-w-none">
        <div className="flex flex-col gap-4">
          {children}
          <ValuePropositions />
        </div>
      </Container>
    </>
  )
}

export default Layout
