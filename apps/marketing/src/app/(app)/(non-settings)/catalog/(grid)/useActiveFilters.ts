import {
  parseAsArrayOf,
  parseAsInteger,
  useQueryStates,
} from 'next-usequerystate'
import React from 'react'

const useActiveFilters = () => {
  // const searchParams = useSearchParams()!

  // const brands = searchParams.get('brands')
  // const categories = searchParams.get('categories')
  // const collections = searchParams.get('collections')
  // const fabrics = searchParams.get('fabrics')
  // const fits = searchParams.get('fits')

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
