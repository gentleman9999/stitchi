import React from 'react'
import CatalogFilters from './CatalogFilters'
import Container from '@components/ui/Container'
import Section from '@components/common/Section'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <CatalogFilters />

      <Container className="max-w-none">
        <Section>{children}</Section>
      </Container>
    </>
  )
}

export default Layout
