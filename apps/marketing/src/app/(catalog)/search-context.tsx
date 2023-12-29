'use client'

import React from 'react'

interface State {
  showSearch: boolean
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchContext = React.createContext<State | undefined>(undefined)

interface Props {
  children: React.ReactNode
}

export const SearchProvider = ({ children }: Props) => {
  const [showSearch, setShowSearch] = React.useState(false)

  return (
    <SearchContext.Provider value={{ showSearch, setShowSearch }}>
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
