import { gql } from '@apollo/client'
import {
  CatalogFiltersProviderSiteFragment,
  CatalogFiltersProviderSiteFragment_brands_edges_node,
  CatalogFiltersProviderSiteFragment_categoryTree,
} from '@generated/CatalogFiltersProviderSiteFragment'
import React from 'react'
import useBrandFilters from './useBrandFilters'
import useCategoryFilters from './useCategoryFilters'

type Brand = CatalogFiltersProviderSiteFragment_brands_edges_node
type Category = CatalogFiltersProviderSiteFragment_categoryTree

type AddedFilterProperties = {
  active: boolean
}

interface AvailableFilters {
  brands: (Brand & AddedFilterProperties)[]
  categories: (Category & AddedFilterProperties)[]
}

interface ActiveFilters {
  brands: Brand[]
  categories: Category[]
}

interface State {
  filters: ActiveFilters
  availableFilters: AvailableFilters
  resetFilters: () => void
  handleToggleBrand: (brandId: string) => void
  handleToggleCategory: (categoryId: string) => void
}

const CatalogFiltersContext = React.createContext<State | undefined>(undefined)

interface CatalogFiltersProviderProps {
  children: React.ReactNode
  site?: CatalogFiltersProviderSiteFragment | null
}

const CatalogFiltersProvider = ({
  children,
  site,
}: CatalogFiltersProviderProps) => {
  const { activeBrands, availableBrands, clearBrands, toggleBrand } =
    useBrandFilters({ site })
  const {
    activeCategories,
    availableCategories,
    clearCategories,
    toggleCategory,
  } = useCategoryFilters({ site })

  const makeFilters = (): AvailableFilters => {
    return {
      brands: availableBrands,
      categories: availableCategories,
    }
  }

  const availableFilters = makeFilters()

  const filters: ActiveFilters = {
    brands: activeBrands,
    categories: activeCategories,
  }

  const resetFilters = () => {
    clearBrands()
    clearCategories()
  }

  return (
    <CatalogFiltersContext.Provider
      value={{
        filters,
        availableFilters,
        resetFilters,
        handleToggleBrand: toggleBrand,
        handleToggleCategory: toggleCategory,
      }}
    >
      {children}
    </CatalogFiltersContext.Provider>
  )
}

const useCatalogFilters = () => {
  const context = React.useContext(CatalogFiltersContext)
  if (context === undefined) {
    throw new Error(
      'useCatalogFilters must be used within a CatalogFiltersProvider',
    )
  }
  return context
}

CatalogFiltersProvider.fragments = {
  site: gql`
    ${useBrandFilters.fragments.site}
    ${useCategoryFilters.fragments.site}
    fragment CatalogFiltersProviderSiteFragment on Site {
      ...UseBrandFiltersSiteFragment
      ...UseCategoryFiltersSiteFragment
    }
  `,
}

export { CatalogFiltersProvider, useCatalogFilters }
