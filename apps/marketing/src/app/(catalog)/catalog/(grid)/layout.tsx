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
import FilterDialog from './CatalogFilters/FilterDialog'
import CatalogBreadcrumbs from './CatalogBreadcrumbs'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const pathname = usePathname()
  const [entity, entitySlug] = useSelectedLayoutSegments()
  const [showFilterDialog, setShowFilterDialog] = React.useState(false)

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
        <FilterDialog
          open={showFilterDialog}
          onClose={() => setShowFilterDialog(false)}
          scroll={true}
          brandEntityId={brand?.id}
          categoryEntityId={category?.id}
        />
        <ClosetPageContainer className="max-w-none flex flex-col gap-4 mt-4">
          <CatalogBreadcrumbs />

          <Header title={title} description={description} />
        </ClosetPageContainer>

        <CatalogTopbar
          activeCategoryId={category?.id}
          onOpenFilters={() => setShowFilterDialog(true)}
        />

        <ClosetPageContainer className="max-w-none flex flex-col gap-4 mt-4 mb-4">
          <div className="flex">
            <aside className="hidden lg:block w-80">
              <CatalogSidebar
                activeCategoryId={category?.id}
                activeCollectionId={collection?.id}
                activeBrandId={brand?.id}
              />
            </aside>

            <div className="flex-1 flex flex-col gap-y-4">
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
