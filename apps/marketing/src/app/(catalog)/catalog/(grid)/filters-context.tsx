'use client'

import { SearchProductsSortInput } from '@generated/types'
import {
  ParserBuilder,
  UseQueryStatesReturn,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'next-usequerystate'
import React from 'react'
import staticData from '@generated/static.json'

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
  filters: ActiveFilters
  search: string
  sort: (typeof SORT_OPTIONS)[number]
  setFilters: SetFiltersFn
  setSearch: (search: string) => void
  setSort: (sort: SearchProductsSortInput) => void
  toggleFilter: (filter: keyof AvailableFilters, id: number) => void
  availableFilters: AvailableFilters
}

const FiltersContext = React.createContext<State | undefined>(undefined)

interface FiltersProviderProps {
  children: React.ReactNode
}

const FiltersProvider = ({ children }: FiltersProviderProps) => {
  const [queryStates, setQueryStates] = useQueryStates(
    {
      brands: parseAsArrayOf(parseAsInteger),
      // fabrics: parseAsArrayOf(parseAsInteger),
      // fits: parseAsArrayOf(parseAsInteger),
      search: parseAsString.withDefault(''),
      sort: parseAsStringEnum(
        Object.values(SearchProductsSortInput),
      ).withDefault(SORT_OPTIONS[0].value),
    },
    {
      scroll: true,
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
      availableFilters,
      setFilters,
      setSearch,
      setSort,
      toggleFilter,
      search: queryStates.search,
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
    availableFilters,
    setFilters,
    setSearch,
    setSort,
    toggleFilter,
    queryStates.search,
    queryStates.sort,
    queryStates.brands,
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

export { FiltersProvider, useFilters }
