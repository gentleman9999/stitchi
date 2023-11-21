import React from 'react'
import CatalogFilters from './CatalogFilters'
import Container from '@components/ui/Container'
import Section from '@components/common/Section'
import CatalogProuductZeroState from './CatalogProductZeroState'
import Title from './Title'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-[calc(100vh-var(--topbar-height))]">
      <Title />
      <CatalogFilters />
      <Container className="max-w-none">
        <Section>{children}</Section>

        <div className="mt-20">
          <CatalogProuductZeroState />
        </div>
      </Container>
    </div>
  )
}

export default Layout
