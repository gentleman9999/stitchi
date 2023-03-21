import React from 'react'

interface State {
  selectedCategoryIds: Set<string>
  toggleCategory: (id: string) => void
}

const DirectoryContext = React.createContext<State | undefined>(undefined)

interface DirectoryProviderProps {
  children: React.ReactNode
}

const DirectoryProvider: React.FC<DirectoryProviderProps> = ({ children }) => {
  const [selectedCategoryIds, setSelectedCategoryIds] = React.useState<
    Set<string>
  >(new Set())

  const toggleCategory = React.useCallback((id: string) => {
    setSelectedCategoryIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const value = React.useMemo<State>(
    () => ({ selectedCategoryIds, toggleCategory }),
    [selectedCategoryIds, toggleCategory],
  )

  return (
    <DirectoryContext.Provider value={value}>
      {children}
    </DirectoryContext.Provider>
  )
}

const useDirectory = () => {
  const context = React.useContext(DirectoryContext)

  if (context === undefined) {
    throw new Error('useDirectory must be used within a DirectoryProvider')
  }

  return context
}

export { DirectoryProvider, useDirectory }
