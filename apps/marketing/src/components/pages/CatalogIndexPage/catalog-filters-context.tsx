// import { CatalogFiltersProviderCategoryFragment } from '@generated/CatalogFiltersProviderCategoryFragment'
import { gql } from '@apollo/client'
import {
  CatalogFiltersProviderSiteFragment,
  CatalogFiltersProviderSiteFragment_brands_edges_node,
} from '@generated/CatalogFiltersProviderSiteFragment'
import { notEmpty } from '@utils/typescript'
import { useRouter } from 'next/router'
import React from 'react'

type Brand = CatalogFiltersProviderSiteFragment_brands_edges_node

interface AvailableFilters {
  brands: Brand[]
}

interface ActiveFilters {
  brands?: Brand[]
}

interface State {
  filters: ActiveFilters
  availableFilters: AvailableFilters
  resetFilters: () => void
  // handleCategoryChange: (categoryId: string | null) => void
  handleBrandChange: (brandId: string | null) => void
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
  const [availableFilters, setAvailableFilters] =
    React.useState<AvailableFilters>(makeFilters(site))

  const router = useRouter()
  const { brandId } = router.query

  React.useEffect(() => {
    setAvailableFilters(makeFilters(site))
  }, [site])

  const resetFilters = () => {
    const params = { ...router.query }
    delete params.categoryId
    router.push({ query: params })
  }

  // const handleCategoryChange: State['handleCategoryChange'] = categoryId => {
  //   const params = { ...router.query }
  //   if (categoryId) {
  //     params.categoryId = categoryId
  //   } else {
  //     delete params.categoryId
  //   }
  //   router.push({ query: params })
  // }

  const handleBrandChange: State['handleBrandChange'] = brandId => {
    const params = { ...router.query }
    if (brandId) {
      const brand = availableFilters.brands.find(({ id }) => id === brandId)
      params.brandId = brand?.path
    } else {
      delete params.brandId
    }
    router.push({ query: params }, undefined, { scroll: false })
  }

  const filters: ActiveFilters = {
    // Only 1 brand for now
    brands: [
      availableFilters.brands.find(({ path }) => path === brandId),
    ].filter(notEmpty),
  }

  return (
    <CatalogFiltersContext.Provider
      value={{
        filters,
        availableFilters: { ...availableFilters },
        resetFilters,
        // handleCategoryChange,
        handleBrandChange,
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

const makeFilters = (
  site?: CatalogFiltersProviderSiteFragment | null,
): AvailableFilters => {
  return {
    brands:
      site?.brands.edges
        ?.map(edge => edge?.node)
        .filter(n => Boolean(n?.products.edges?.length))
        .filter(notEmpty) || [],
  }
}

CatalogFiltersProvider.fragments = {
  site: gql`
    fragment CatalogFiltersProviderSiteFragment on Site {
      brands {
        edges {
          node {
            id
            name
            path
            entityId
            products(first: 1) {
              edges {
                __typename
              }
            }
          }
        }
      }
    }
  `,
}

export { CatalogFiltersProvider, useCatalogFilters }
