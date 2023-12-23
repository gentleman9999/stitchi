'use client'

import React from 'react'
import Section from '@components/common/Section'
import CatalogProuductZeroState from './CatalogPorductGrid/CatalogProductZeroState'
import { FiltersProvider } from './filters-context'
import { usePathname, useSelectedLayoutSegments } from 'next/navigation'
import staticData from '@generated/static.json'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import Header from './Header'
import { CategoriesProvider } from './categories-context'
import CatalogSidebar from './CatalogSidebar'
import CatalogTopbar from './CatalogTopbar'

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
    <CategoriesProvider>
      <FiltersProvider>
        <ClosetPageContainer className="max-w-none min-h-[calc(100vh-var(--topbar-height))] flex flex-col gap-4 mt-4">
          <Header title={title} description={description} />

          <div className="flex">
            <aside className="w-80">
              <CatalogSidebar
                activeCategoryId={category?.id}
                activeCollectionId={collection?.id}
              />
            </aside>

            <div className="flex-1 flex flex-col gap-y-4">
              <CatalogTopbar />

              <Section>{children}</Section>

              <div className="mt-20">
                <CatalogProuductZeroState />
              </div>
            </div>
          </div>
        </ClosetPageContainer>
      </FiltersProvider>
    </CategoriesProvider>
  )
}

export default Layout
