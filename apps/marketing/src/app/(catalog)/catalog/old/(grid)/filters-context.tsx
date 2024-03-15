'use client'

import {
  FiltersProviderDynamicFilterFragment,
  SearchProductFilter,
  SearchProductsSortInput,
} from '@generated/types'
import {
  ParserBuilder,
  UseQueryStatesReturn,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs'
import React, { useState, useTransition } from 'react'
import staticData from '@generated/static.json'
import { gql } from '@apollo/client'

const SORT_OPTIONS = [
  {
    label: 'Featured',
    value: SearchProductsSortInput.FEATURED,
  },
  {
    label: 'Relevance',
    value: SearchProductsSortInput.RELEVANCE,
  },
  {
    label: 'Price: Low to High',
    value: SearchProductsSortInput.LOWEST_PRICE,
  },
  {
    label: 'Price: High to Low',
    value: SearchProductsSortInput.HIGHEST_PRICE,
  },
  {
    label: 'Best Sellers',
    value: SearchProductsSortInput.BEST_SELLING,
  },
]

type IntArrayFilter = ParserBuilder<number[]>

type QueryFilters = {
  brands: IntArrayFilter
  sort: Omit<ParserBuilder<SearchProductsSortInput>, 'parseServerSide'> & {
    readonly defaultValue: SearchProductsSortInput
  }
  search: Omit<ParserBuilder<string>, 'parseServerSide'> & {
    readonly defaultValue: string
  }
}

interface AvailableFilters {
  brands: typeof staticData.brands
  sort: typeof SORT_OPTIONS
}

type ActiveFilters = {
  brands: typeof staticData.brands
}

type SetFiltersFn = UseQueryStatesReturn<
  Omit<QueryFilters, 'sort' | 'search'>
>[1]

interface State {
  transitioning: boolean
  filters: ActiveFilters
  search: string
  sort: (typeof SORT_OPTIONS)[number]
  setFilters: SetFiltersFn
  setSearch: (search: string) => void
  setSort: (sort: SearchProductsSortInput) => void
  setDynamicFilters: (filters: FiltersProviderDynamicFilterFragment[]) => void
  toggleFilter: (filter: keyof AvailableFilters, id: number) => void
  availableFilters: AvailableFilters
  availableDynamicFilters: FiltersProviderDynamicFilterFragment[]
}

const FiltersContext = React.createContext<State | undefined>(undefined)

interface FiltersProviderProps {
  children: React.ReactNode
}

const FiltersProvider = ({ children }: FiltersProviderProps) => {
  const [transitioning, startTransition] = useTransition()

  const [dynamicFilters, setDynamicFilters] = useState<
    FiltersProviderDynamicFilterFragment[]
  >([])

  const [queryStates, setQueryStates] = useQueryStates(
    {
      brands: parseAsArrayOf(parseAsInteger),
      search: parseAsString.withDefault(''),
      sort: parseAsStringEnum(
        Object.values(SearchProductsSortInput),
      ).withDefault(SORT_OPTIONS[0].value),
    },
    {
      scroll: true,
      startTransition,
    },
  )

  const setSearch = React.useCallback(
    (search: string) => {
      setQueryStates(prev => ({
        ...prev,
        search: search.length > 0 ? search : null,
      }))
    },
    [setQueryStates],
  )

  const setSort = React.useCallback(
    (sort: SearchProductsSortInput) => {
      setQueryStates(prev => ({ ...prev, sort }))
    },
    [setQueryStates],
  )

  const setFilters = React.useCallback<SetFiltersFn>(
    filters => {
      return setQueryStates(prev =>
        typeof filters === 'function' ? filters(prev) : filters,
      )
    },
    [setQueryStates],
  )

  const toggleFilter = React.useCallback(
    (filter: keyof QueryFilters, id: number) => {
      setFilters(prev => {
        const currentFilters = prev[filter as keyof typeof prev]
        const newFilters = currentFilters?.includes(id)
          ? currentFilters.filter(currentId => currentId !== id)
          : [...(currentFilters || []), id]

        return {
          [filter]: newFilters,
        }
      })
    },
    [setFilters],
  )

  const availableFilters = React.useMemo(
    () => ({
      sort: SORT_OPTIONS,
      brands:
        staticData.brands.sort((a, b) => a.name.localeCompare(b.name)) || [],
    }),
    [],
  )

  const state = React.useMemo<State>(() => {
    return {
      transitioning,
      availableFilters,
      setFilters,
      setSearch,
      setSort,
      toggleFilter,
      setDynamicFilters,
      search: queryStates.search,
      availableDynamicFilters: dynamicFilters,
      sort:
        SORT_OPTIONS.find(option => option.value === queryStates.sort) ||
        SORT_OPTIONS[0],
      filters: {
        brands: availableFilters.brands.filter(brand =>
          queryStates.brands?.includes(brand.id),
        ),
      },
    }
  }, [
    transitioning,
    availableFilters,
    setFilters,
    setSearch,
    setSort,
    toggleFilter,
    queryStates.search,
    queryStates.sort,
    queryStates.brands,
    dynamicFilters,
  ])

  return (
    <FiltersContext.Provider value={state}>{children}</FiltersContext.Provider>
  )
}

const useFilters = () => {
  const context = React.useContext(FiltersContext)
  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider')
  }
  return context
}

FiltersProvider.fragments = {
  dynamicFilter: gql`
    fragment FiltersProviderDynamicFilterFragment on SearchProductFilter {
      __typename
      name
      isCollapsedByDefault

      ... on PriceSearchFilter {
        selected {
          minPrice
          maxPrice
        }
      }

      ... on ProductAttributeSearchFilter {
        displayProductCount
        filterName
        attributes {
          edges {
            node {
              value
              isSelected
              productCount
            }
          }
        }
      }
    }
  `,
}

export { FiltersProvider, useFilters }
