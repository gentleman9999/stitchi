import { gql } from '@apollo/client'
import {
  CatalogFiltersProviderSiteFragment,
  CatalogFiltersProviderSiteFragment_brands_edges_node,
  CatalogFiltersProviderSiteFragment_categoryTree,
} from '@generated/CatalogFiltersProviderSiteFragment'
import React from 'react'
import useFilters from './useFilters'

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
  activeFilters: ActiveFilters
  availableFilters: AvailableFilters
  setFilters: ReturnType<typeof useFilters>['setFilters']
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
  const { availableFilters, activeFilters, setFilters } = useFilters({ site })

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

CatalogFiltersProvider.fragments = {
  site: gql`
    ${useFilters.fragments.site}
    fragment CatalogFiltersProviderSiteFragment on Site {
      ...UseFiltersSiteFragment
    }
  `,
}

export { CatalogFiltersProvider, useCatalogFilters }
