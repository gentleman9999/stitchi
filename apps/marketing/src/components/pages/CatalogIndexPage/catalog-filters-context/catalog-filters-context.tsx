import { gql } from '@apollo/client'
import {
  CatalogFiltersProviderSiteFragment,
  CatalogFiltersProviderSiteFragment_brands_edges_node,
} from '@generated/CatalogFiltersProviderSiteFragment'
import { notEmpty } from '@utils/typescript'
import React from 'react'
import useBrandFilters from './useBrandFilters'

type Brand = CatalogFiltersProviderSiteFragment_brands_edges_node

interface AvailableFilters {
  brands: (Brand & { active: boolean })[]
}

interface ActiveFilters {
  brands?: Brand[]
}

interface State {
  filters: ActiveFilters
  availableFilters: AvailableFilters
  resetFilters: () => void
  handleToggleBrand: (brandId: string) => void
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
    useBrandFilters({
      brands: site?.brands.edges?.map(e => e?.node).filter(notEmpty) || [],
    })

  const makeFilters = (): AvailableFilters => {
    return {
      brands: availableBrands,
    }
  }

  const availableFilters = makeFilters()

  const filters = {
    brands: activeBrands,
  }

  const resetFilters = () => {
    clearBrands()
  }

  return (
    <CatalogFiltersContext.Provider
      value={{
        filters,
        availableFilters,
        resetFilters,
        handleToggleBrand: toggleBrand,
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
    fragment CatalogFiltersProviderSiteFragment on Site {
      ...UseBrandFiltersSiteFragment
    }
  `,
}

export { CatalogFiltersProvider, useCatalogFilters }
