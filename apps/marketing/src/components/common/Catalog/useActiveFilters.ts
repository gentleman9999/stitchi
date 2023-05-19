import { queryTypes, useQueryStates } from 'next-usequerystate'
import React from 'react'

const useActiveFilters = () => {
  const [{ brands, categories, collections, fabric, fit }] = useQueryStates({
    brands: queryTypes.array(queryTypes.integer),
    categories: queryTypes.array(queryTypes.integer),
    fabric: queryTypes.array(queryTypes.integer),
    collections: queryTypes.array(queryTypes.integer),
    fit: queryTypes.array(queryTypes.integer),
  })

  const state = React.useMemo(
    () => ({
      brands: brands?.length ? brands : null,
      categories: categories?.length ? categories : null,
      collections: collections?.length ? collections : null,
      fabric: fabric?.length ? fabric : null,
      fit: fit?.length ? fit : null,
    }),
    [brands, categories, collections, fabric, fit],
  )

  return state
}

export default useActiveFilters
