import { gql } from '@apollo/client'
import { CatalogFiltersProviderCategoryFragment } from '@generated/CatalogFiltersProviderCategoryFragment'
import { MaterialFilterArg } from '@generated/globalTypes'
import { useRouter } from 'next/router'
import React from 'react'

interface AvailableFilters {
  categories: CatalogFiltersProviderCategoryFragment[]
}

interface State {
  filters: MaterialFilterArg
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
  availableFilters,
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

  const filters: MaterialFilterArg = {
    categoryId: categoryId ? { eq: categoryId.toString() } : undefined,
  }

  return (
    <CatalogFiltersContext.Provider
      value={{
        filters,
        availableFilters: { categories: [], ...availableFilters },
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

CatalogFiltersProvider.fragments = {
  category: gql`
    fragment CatalogFiltersProviderCategoryFragment on Category {
      id
      name
      parentCategoryId
    }
  `,
}

export { CatalogFiltersProvider, useCatalogFilters }
