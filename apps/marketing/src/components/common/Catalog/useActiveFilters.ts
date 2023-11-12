import {
  parseAsArrayOf,
  parseAsInteger,
  useQueryStates,
} from 'next-usequerystate'
import React from 'react'

const useActiveFilters = () => {
  const [{ brands, categories, collections, fabrics, fits }] = useQueryStates({
    brands: parseAsArrayOf(parseAsInteger),
    categories: parseAsArrayOf(parseAsInteger),
    fabrics: parseAsArrayOf(parseAsInteger),
    collections: parseAsArrayOf(parseAsInteger),
    fits: parseAsArrayOf(parseAsInteger),
  })

  const state = React.useMemo(
    () => ({
      brands: brands?.length ? brands : null,
      categories: categories?.length ? categories : null,
      collections: collections?.length ? collections : null,
      fabrics: fabrics?.length ? fabrics : null,
      fits: fits?.length ? fits : null,
    }),
    [brands, categories, collections, fabrics, fits],
  )

  return state
}

export default useActiveFilters
