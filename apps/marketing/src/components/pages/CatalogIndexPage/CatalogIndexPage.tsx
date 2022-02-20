import { Section } from '@components/common'
import React from 'react'
import { Container } from 'ui'
import CatalogIndexPageFilters from './CatalogIndexPageFilters'
import CatalogIndexPageProductGrid from './CatalogIndexPageProductGrid'

export interface CatalogIndexPageProps {}

const CatalogIndexPage = (props: CatalogIndexPageProps) => {
  return (
    <>
      <Container>
        <Section gutter="sm">
          <h1 className="text-3xl font-semibold">
            Browse through our selection of curated products
          </h1>
        </Section>
      </Container>
      <Container>
        <Section gutter="md">
          <div className="grid grid-cols-4 gap-10">
            <div className="col-span-1">
              <CatalogIndexPageFilters />
            </div>
            <div className="col-span-3">
              <CatalogIndexPageProductGrid />
            </div>
          </div>
        </Section>
      </Container>
    </>
  )
}

export default CatalogIndexPage
