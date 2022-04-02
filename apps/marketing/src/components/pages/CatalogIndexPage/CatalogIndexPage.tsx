import { Section } from '@components/common'
import React from 'react'
import { Button, Container } from '@components/ui'
import CatalogIndexPageFilters from './CatalogIndexPageFilters'
import CatalogIndexPageProductGrid from './CatalogIndexPageProductGrid'
import { gql } from '@apollo/client'
import { CatalogIndexPageCategoryFragment } from '@generated/CatalogIndexPageCategoryFragment'
import { CatalogFiltersProvider } from './catalog-filters-context'
import { NeedleThread } from 'icons'

export interface CatalogIndexPageProps {
  categories: CatalogIndexPageCategoryFragment[]
}

const CatalogIndexPage = ({ categories }: CatalogIndexPageProps) => {
  return (
    <>
      <Container>
        <Section gutter="sm">
          <div className="p-14 md:pr-0 bg-primaryAlt-100 rounded-xl flex items-center">
            <div className="md:w-[70%]">
              <h1 className="text-4xl font-bold tracking-tight">
                Browse through our curated selection of products
              </h1>
              <p className="mt-6 text-lg text-gray-700">
                We work with brands that you wont find anywhere else. Our team
                of experts is continually procuring the highest-quality,
                ethical, and unique products so that you can create experiences
                people love.
              </p>
              <Button slim className="mt-6">
                Talk to a designer
              </Button>
            </div>
            <div className="w-[30%] hidden md:flex items-center justify-center">
              <NeedleThread />
            </div>
          </div>
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
