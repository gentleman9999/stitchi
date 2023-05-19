import { queryTypes, useQueryStates } from 'next-usequerystate'
import React from 'react'

const useActiveFilters = () => {
  const [{ brands, categories, collections, fabrics, fits }] = useQueryStates({
    brands: queryTypes.array(queryTypes.integer),
    categories: queryTypes.array(queryTypes.integer),
    fabrics: queryTypes.array(queryTypes.integer),
    collections: queryTypes.array(queryTypes.integer),
    fits: queryTypes.array(queryTypes.integer),
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
