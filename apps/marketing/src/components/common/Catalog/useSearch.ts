import { parseAsString, useQueryState } from 'next-usequerystate'
import React from 'react'

const useSearch = () => {
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault(''),
  )

  return {
    search,
    setSearch,
  }
}

export default useSearch
