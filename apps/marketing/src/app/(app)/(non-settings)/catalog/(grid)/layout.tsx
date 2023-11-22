'use client'

import React from 'react'
import CatalogFilters from './CatalogFilters'
import Section from '@components/common/Section'
import CatalogProuductZeroState from './CatalogProductZeroState'
import { FiltersProvider } from './filters-context'
import { useSelectedLayoutSegments } from 'next/navigation'
import staticData from '@generated/static.json'
import ClosetPageContainer from '@components/common/ClosetPageContainer'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const [entity, entitySlug] = useSelectedLayoutSegments()

  let brand
  let category

  if (entity === 'brands') {
    brand = staticData.brands.find(
      brand => brand.custom_url.url === `/${entitySlug}/`,
    )
  } else if (entity === 'categories') {
    category = staticData.categories.find(
      category => category.custom_url.url === `/${entitySlug}/`,
    )
  }

  let title = brand ? brand.name : category ? category.name : null

  return (
    <div className="min-h-[calc(100vh-var(--topbar-height))]">
      {title ? (
        <ClosetPageContainer className="max-w-none">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold">
            {title}
          </h1>
        </ClosetPageContainer>
      ) : (
        <h1 className="sr-only">Catalog</h1>
      )}

      <FiltersProvider
        brandEntityId={brand?.id}
        categoryEntityId={category?.id}
      >
        <CatalogFilters
          brandEntityId={brand?.id}
          categoryEntityId={category?.id}
        />
        <ClosetPageContainer className="max-w-none">
          <Section>{children}</Section>

          <div className="mt-20">
            <CatalogProuductZeroState />
          </div>
        </ClosetPageContainer>
      </FiltersProvider>
    </div>
  )
}

export default Layout
