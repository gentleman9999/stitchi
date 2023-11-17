import { SearchProductsSortInput } from '@generated/types'
import { parseAsStringEnum, useQueryState } from 'next-usequerystate'

const options = [
  {
    label: 'Relevance',
    value: SearchProductsSortInput.RELEVANCE,
  },
  {
    label: 'Featured',
    value: SearchProductsSortInput.FEATURED,
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

const useSort = () => {
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringEnum(Object.values(SearchProductsSortInput)).withDefault(
      SearchProductsSortInput.FEATURED,
    ),
  )

  const formattedSort = options.find(option => option.value === sort)

  if (!formattedSort) {
    throw new Error(`Invalid sort option: ${sort}`)
  }

  return {
    setSort,
    sort: formattedSort,
    sortOptions: options,
  }
}

export default useSort
