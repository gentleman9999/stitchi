import { queryTypes, useQueryStates } from 'next-usequerystate'
import React from 'react'

const useActiveFilters = () => {
  const [{ brands, categories }] = useQueryStates(
    {
      brands: queryTypes.array(queryTypes.integer),
      categories: queryTypes.array(queryTypes.integer),
    },
    {
      history: 'push',
    },
  )

  const state = React.useMemo(
    () => ({
      brands: brands?.length ? brands : null,
      categories: categories?.length ? categories : null,
    }),
    [brands, categories],
  )

  return state
}

export default useActiveFilters
