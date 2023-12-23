'use client'

import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import {
  SearchProductsSortInput,
  UseCatalogFiltersGetDataQuery,
} from '@generated/types'
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
import { notEmpty } from '@lib/utils/typescript'

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
  categories: IntArrayFilter
  collections: IntArrayFilter
  fabrics: IntArrayFilter
  fits: IntArrayFilter
  sort: Omit<ParserBuilder<SearchProductsSortInput>, 'parseServerSide'> & {
    readonly defaultValue: SearchProductsSortInput
  }
  search: Omit<ParserBuilder<string>, 'parseServerSide'> & {
    readonly defaultValue: string
  }
}

interface AvailableFilters {
  brands: typeof staticData.brands
  categories: UseCatalogFiltersGetDataQuery['site']['categoryTree']
  collections: UseCatalogFiltersGetDataQuery['site']['collections'][0]['children']
  fabrics: UseCatalogFiltersGetDataQuery['site']['fabricCategory'][0]['children']
  fits: UseCatalogFiltersGetDataQuery['site']['fit'][0]['children']
  sort: typeof SORT_OPTIONS
}

type ActiveFilters = {
  brands: typeof staticData.brands
  category?: UseCatalogFiltersGetDataQuery['site']['categoryTree'][number]
  collection?: UseCatalogFiltersGetDataQuery['site']['collections'][0]['children'][number]
  fabrics: UseCatalogFiltersGetDataQuery['site']['fabricCategory'][0]['children']
  fits: UseCatalogFiltersGetDataQuery['site']['fit'][0]['children']
}

type ToggleableFilters = keyof Omit<
  AvailableFilters,
  'categories' | 'collections'
>

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
  toggleFilter: (filter: ToggleableFilters, id: number) => void
  availableFilters: AvailableFilters
}

const FiltersContext = React.createContext<State | undefined>(undefined)

interface FiltersProviderProps {
  children: React.ReactNode
  brandEntityId?: number
  categoryEntityId?: number
  collectionEntityId?: number
}

const FiltersProvider = ({
  children,
  brandEntityId,
  categoryEntityId,
  collectionEntityId,
}: FiltersProviderProps) => {
  const [queryStates, setQueryStates] = useQueryStates(
    {
      brands: parseAsArrayOf(parseAsInteger),
      fabrics: parseAsArrayOf(parseAsInteger),
      fits: parseAsArrayOf(parseAsInteger),
      search: parseAsString.withDefault(''),
      sort: parseAsStringEnum(
        Object.values(SearchProductsSortInput),
      ).withDefault(SORT_OPTIONS[0].value),
    },
    {
      scroll: true,
    },
  )

  const { data } = useSuspenseQuery<UseCatalogFiltersGetDataQuery>(GET_DATA)

  const { categoryTree, collections, fabricCategory, fit } = data?.site || {}

  const defaultBrand = staticData.brands.find(
    brand => brand.id === brandEntityId,
  )

  const defaultCategory = getDefaultCategory(
    [...categoryTree, ...(collections as any), ...fabricCategory, ...fit],
    categoryEntityId,
  )

  const defaultCollection = collections?.[0].children.find(
    collection => collection.entityId === collectionEntityId,
  )

  const setSearch = React.useCallback(
    (search: string) => {
      setQueryStates({ search })
    },
    [setQueryStates],
  )

  const setSort = React.useCallback(
    (sort: SearchProductsSortInput) => {
      setQueryStates({ sort })
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
    (filter: keyof AvailableFilters, id: number) => {
      setFilters(prev => {
        const currentFilters = prev[filter]
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
      brands: defaultBrand
        ? [defaultBrand]
        : staticData.brands.sort((a, b) => a.name.localeCompare(b.name)) || [],

      categories: categoryTree?.filter(notEmpty) || [],
      fabrics: fabricCategory?.[0].children || [],
      collections: collections?.[0].children || [],
      fits: fit?.[0].children || [],
    }),
    [categoryTree, collections, defaultBrand, fabricCategory, fit],
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
        brands: defaultBrand
          ? [defaultBrand]
          : availableFilters.brands.filter(brand =>
              queryStates.brands?.includes(brand.id),
            ),
        category: defaultCategory || undefined,
        fabrics: availableFilters.fabrics.filter(fabric =>
          queryStates.fabrics?.includes(fabric.entityId),
        ),
        collection: defaultCollection || undefined,
        fits: availableFilters.fits.filter(fit =>
          queryStates.fits?.includes(fit.entityId),
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
    queryStates.fabrics,
    queryStates.fits,
    defaultBrand,
    defaultCategory,
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

type CategoryTree = NonNullable<
  UseCatalogFiltersGetDataQuery['site']['categoryTree']
>

const getDefaultCategory = (categoryTree: CategoryTree, id?: number) => {
  if (!id) {
    return null
  }

  // write recursive function to find the category id
  const findCategory = (
    categoryTree: CategoryTree,
    id: number,
  ): CategoryTree[number] | null => {
    const category = categoryTree.find(category => category.entityId === id)

    if (category) {
      return category
    }

    for (const category of categoryTree) {
      const foundCategory = findCategory((category.children as any) || [], id)

      if (foundCategory) {
        return foundCategory
      }
    }

    return null
  }

  const category = findCategory(categoryTree, id)

  return category
}

export { FiltersProvider, useFilters }

const GET_DATA = gql`
  query UseCatalogFiltersGetDataQuery {
    site {
      categoryTree {
        entityId
        name
        path
        children {
          entityId
          name
          path
          children {
            entityId
            name
            path

            children {
              entityId
              name
              path
            }
          }
        }
      }
      fabricCategory: categoryTree(rootEntityId: 506) {
        entityId
        path
        children {
          entityId
          name
          path
        }
      }
      collections: categoryTree(rootEntityId: 516) {
        entityId
        path
        children {
          entityId
          name
          path
        }
      }
      fit: categoryTree(rootEntityId: 508) {
        entityId
        path
        children {
          entityId
          name
          path
        }
      }
    }
  }
`
