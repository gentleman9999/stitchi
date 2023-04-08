import {
  UseCatalogFiltersGetDataQuery_site_brands_edges_node as Brand,
  UseCatalogFiltersGetDataQuery_site_categoryTree as Category,
} from '@generated/UseCatalogFiltersGetDataQuery'
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
  brandEntityId?: number
  children: React.ReactNode
}

const CatalogFiltersProvider = ({
  children,
  brandEntityId,
}: CatalogFiltersProviderProps) => {
  const { availableFilters, activeFilters, setFilters } = useFilters({
    brandEntityId,
  })

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
