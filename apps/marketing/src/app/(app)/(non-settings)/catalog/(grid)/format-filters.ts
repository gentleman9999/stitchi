import { SearchProductsFiltersInput } from '@generated/types'

interface Params {
  search: string
  brands: number[] | null
  categories: number[] | null
  collections: number[] | null
  fabrics: number[] | null
  fits: number[] | null
}

export const mergeFilters = (params: Params): SearchProductsFiltersInput => {
  let categoryEntityIds: number[] | null = [
    ...(params.categories || []),
    ...(params.collections || []),
    ...(params.fabrics || []),
    ...(params.fits || []),
  ]

  if (!categoryEntityIds.length) {
    categoryEntityIds = null
  }

  return {
    searchTerm: params.search,
    searchSubCategories: true,

    brandEntityIds: params.brands?.length ? params.brands : undefined,
    categoryEntityIds: Boolean(categoryEntityIds)
      ? categoryEntityIds
      : undefined,
  }
}
