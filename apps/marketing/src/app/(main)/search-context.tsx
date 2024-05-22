'use client'

import { parseAsString, useQueryState } from 'nuqs'
import React from 'react'

interface State {
  searchTerm: string | null
  showSearch: boolean
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchContext = React.createContext<State | undefined>(undefined)

interface Props {
  children: React.ReactNode
}

export const SearchProvider = ({ children }: Props) => {
  const [searchTerm] = useQueryState('searchTerm', parseAsString)
  const [showSearch, setShowSearch] = React.useState(false)

  return (
    <SearchContext.Provider value={{ showSearch, searchTerm, setShowSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => {
  const context = React.useContext(SearchContext)

  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }

  return context
}
