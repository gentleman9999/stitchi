'use client'

import React from 'react'
// import CatalogFilters from './CatalogFilters'
import Section from '@components/common/Section'
import CatalogProuductZeroState from './CatalogProductZeroState'
import { FiltersProvider } from './filters-context'
import { usePathname, useSelectedLayoutSegments } from 'next/navigation'
import staticData from '@generated/static.json'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import CatalogFiltersV2 from './CatalogFiltersV2'
import Header from './Header'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const pathname = usePathname()
  const [entity, entitySlug] = useSelectedLayoutSegments()

  let brand
  let category
  let collection

  if (entity === 'brands') {
    brand = staticData.brands.find(
      brand => brand.custom_url.url === `/${entitySlug}/`,
    )
  } else if (entity === 'categories') {
    if (pathname?.includes('collections')) {
      collection = staticData.categories.find(
        category => category.custom_url.url === `/${entitySlug}/`,
      )
    } else {
      category = staticData.categories.find(
        category => category.custom_url.url === `/${entitySlug}/`,
      )
    }
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
        collectionEntityId={collection?.id}
      >
        {/* <CatalogFilters
          brandEntityId={brand?.id}
          categoryEntityId={category?.id}
        /> */}
        <Header />
        <div className="flex">
          <CatalogFiltersV2 />

          <ClosetPageContainer className="max-w-none !m-0">
            <Section>{children}</Section>

            <div className="mt-20">
              <CatalogProuductZeroState />
            </div>
          </ClosetPageContainer>
        </div>
      </FiltersProvider>
    </div>
  )
}

export default Layout
