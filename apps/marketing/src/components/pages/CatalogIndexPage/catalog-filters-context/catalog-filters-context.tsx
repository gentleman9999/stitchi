import {
  CatalogFiltersProviderSiteFragment_brands_edges_node as Brand,
  CatalogFiltersProviderSiteFragment_categoryTree as Category,
} from '@generated/CatalogFiltersProviderSiteFragment'
import React from 'react'
import useFilters from './useCatalogFilters'

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
  activeFilters: ActiveFilters
  availableFilters: AvailableFilters
  setFilters: ReturnType<typeof useFilters>['setFilters']
}

const CatalogFiltersContext = React.createContext<State | undefined>(undefined)

interface CatalogFiltersProviderProps {
  children: React.ReactNode
}

const CatalogFiltersProvider = ({ children }: CatalogFiltersProviderProps) => {
  const { availableFilters, activeFilters, setFilters } = useFilters()

  return (
    <CatalogFiltersContext.Provider
      value={{
        activeFilters,
        availableFilters,
        setFilters,
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

export { CatalogFiltersProvider, useCatalogFilters }
