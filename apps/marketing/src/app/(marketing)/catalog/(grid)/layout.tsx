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
  let description = category ? category.description : null

  return (
    <div className="min-h-[calc(100vh-var(--topbar-height))]">
      {title ? (
        <ClosetPageContainer className="max-w-none">
          <div className="bg-gray-100 p-6 rounded-md mt-2 mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-heading">
              {title}
            </h1>

            {description ? (
              <div
                className="mt-2 text-sm sm:text-base text-gray-600 max-w-4xl"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : null}
          </div>
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
