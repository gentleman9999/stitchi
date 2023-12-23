import { SearchProductsFiltersInput } from '@generated/types'

interface Params {
  search: string
  brands: number[] | null
  category: number | null
}

export const mergeFilters = (params: Params): SearchProductsFiltersInput => {
  return {
    searchTerm: params.search,
    searchSubCategories: true,

    brandEntityIds: params.brands?.length ? params.brands : undefined,
    categoryEntityId: params.category,
  }
}
