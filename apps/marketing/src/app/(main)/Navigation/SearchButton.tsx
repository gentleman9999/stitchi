'use client'

import IconButton from '@components/ui/IconButton'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { useSearch } from '../search-context'

const SearchButton = () => {
  const { setShowSearch } = useSearch()
  return (
    <IconButton
      className="text-white"
      variant="ghost"
      name="display search bar"
      onClick={() => setShowSearch(prev => !prev)}
    >
      <MagnifyingGlassIcon className="w-5 h-5" />
    </IconButton>
  )
}

export default SearchButton
