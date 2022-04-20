import { Section } from '@components/common'
import React from 'react'
import { Button, Container } from '@components/ui'
import CatalogIndexPageFilters from './CatalogIndexPageFilters'
import CatalogIndexPageProductGrid from './CatalogIndexPageProductGrid'
import { CatalogFiltersProvider } from './catalog-filters-context'
import { NeedleThread } from 'icons'
import Link from 'next/link'
import routes from '@lib/routes'
import { gql } from '@apollo/client'
import { CatalogIndexPageSiteFragment } from '@generated/CatalogIndexPageSiteFragment'

export interface CatalogIndexPageProps {
  site?: CatalogIndexPageSiteFragment | null
}

const CatalogIndexPage = ({ site }: CatalogIndexPageProps) => {
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
              <Link href={routes.internal.getStarted.href()} passHref>
                <Button slim className="mt-6">
                  Talk to a designer
                </Button>
              </Link>
            </div>
            <div className="w-[30%] hidden md:flex items-center justify-center">
              <NeedleThread />
            </div>
          </div>
        </Section>
      </Container>
      <Container>
        <Section gutter="md">
          <CatalogFiltersProvider site={site}>
            <div className="col-span-1">
              <h2 className="font-bold text-xl">Find the perfect product</h2>
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
  site: gql`
    ${CatalogFiltersProvider.fragments.site}
    fragment CatalogIndexPageSiteFragment on Site {
      ...CatalogFiltersProviderSiteFragment
    }
  `,
}

export default CatalogIndexPage
