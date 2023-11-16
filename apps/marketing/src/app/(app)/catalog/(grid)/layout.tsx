import React from 'react'
import CatalogFilters from './CatalogFilters'
import Container from '@components/ui/Container'
import Section from '@components/common/Section'
import CatalogProuductZeroState from './CatalogProductZeroState'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <CatalogFilters />

      <Container className="max-w-none">
        <Section>{children}</Section>

        <div className="mt-20">
          <CatalogProuductZeroState />
        </div>
      </Container>
    </>
  )
}

export default Layout
