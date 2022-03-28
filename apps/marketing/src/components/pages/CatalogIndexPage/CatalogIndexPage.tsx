import { Section } from '@components/common'
import React from 'react'
import { Container } from '@components/ui'
import CatalogIndexPageFilters from './CatalogIndexPageFilters'
import CatalogIndexPageProductGrid from './CatalogIndexPageProductGrid'
import { gql } from '@apollo/client'
import { CatalogIndexPageCategoryFragment } from '@generated/CatalogIndexPageCategoryFragment'
import { CatalogFiltersProvider } from './catalog-filters-context'

export interface CatalogIndexPageProps {
  categories: CatalogIndexPageCategoryFragment[]
}

const CatalogIndexPage = ({ categories }: CatalogIndexPageProps) => {
  return (
    <>
      <Container>
        <Section gutter="sm">
          <h1 className="text-3xl font-semibold tracking-tight">
            Browse through our selection of curated products
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-4xl">
            We work with brands that you wont find anywhere else. Our team of
            experts is continually procuring the highest-quality, ethical, and
            unique products so that you can create experiences people love.
          </p>
        </Section>
      </Container>
      <Container>
        <Section gutter="md">
          <CatalogFiltersProvider availableFilters={{ categories }}>
            <div className="col-span-1">
              <CatalogIndexPageFilters />
            </div>
            <div className="mt-10 grid grid-cols-1 gap-10">
              <div className="col-span-1">
                <CatalogIndexPageProductGrid />
              </div>
            </div>
          </CatalogFiltersProvider>
        </Section>
      </Container>
    </>
  )
}

CatalogIndexPage.fragments = {
  category: gql`
    ${CatalogFiltersProvider.fragments.category}

    fragment CatalogIndexPageCategoryFragment on Category {
      id
      ...CatalogFiltersProviderCategoryFragment
    }
  `,
}

export default CatalogIndexPage
