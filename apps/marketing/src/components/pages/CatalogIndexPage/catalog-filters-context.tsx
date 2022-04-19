// import { CatalogFiltersProviderCategoryFragment } from '@generated/CatalogFiltersProviderCategoryFragment'
import { useRouter } from 'next/router'
import React from 'react'

interface AvailableFilters {
  categories: any[]
}

interface ActiveFilters {
  category?: any
}

interface State {
  filters: ActiveFilters
  availableFilters: AvailableFilters
  resetFilters: () => void
  handleCategoryChange: (categoryId: string | null) => void
}

const CatalogFiltersContext = React.createContext<State | undefined>(undefined)

interface CatalogFiltersProviderProps {
  children: React.ReactNode
  availableFilters?: AvailableFilters
}

const CatalogFiltersProvider = ({
  children,
  availableFilters = { categories: [] },
}: CatalogFiltersProviderProps) => {
  const router = useRouter()
  const { categoryId } = router.query

  const resetFilters = () => {
    const params = { ...router.query }
    delete params.categoryId
    router.push({ query: params })
  }

  const handleCategoryChange: State['handleCategoryChange'] = categoryId => {
    const params = { ...router.query }
    if (categoryId) {
      params.categoryId = categoryId
    } else {
      delete params.categoryId
    }
    router.push({ query: params })
  }

  const filters: ActiveFilters = {
    category: undefined,
  }

  return (
    <CatalogFiltersContext.Provider
      value={{
        filters,
        availableFilters: { ...availableFilters },
        resetFilters,
        handleCategoryChange,
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
