import { notEmpty } from '@/utils/typescript'
import {
  DirectoryIndexPageGetDataQuery,
  DirectoryIndexPageGetDataQueryVariables,
} from '@/__generated__/graphql'
import { QueryResult } from '@apollo/client'
import React from 'react'

interface State {
  selectedCategoryIds: Set<string>
  toggleCategory: (id: string) => void
  fetchMoreResults: () => void
}

const DirectoryContext = React.createContext<State | undefined>(undefined)

interface DirectoryProviderProps {
  children: React.ReactNode
  queryResult: QueryResult<
    DirectoryIndexPageGetDataQuery,
    DirectoryIndexPageGetDataQueryVariables
  >
  categoryId?: string
}

const DirectoryProvider: React.FC<DirectoryProviderProps> = ({
  children,
  categoryId,
  queryResult: { refetch, fetchMore, data, variables },
}) => {
  const [selectedCategoryIds, setSelectedCategoryIds] = React.useState<
    Set<string>
  >(new Set())

  React.useEffect(() => {
    refetch({
      ...variables,
      filter: {
        ...variables?.filter,
        categories: {
          allIn: [categoryId, ...Array.from(selectedCategoryIds)].filter(
            notEmpty,
          ),
        },
      },
    })
  }, [categoryId, refetch, selectedCategoryIds, variables])

  const toggleCategory = React.useCallback((id: string) => {
    setSelectedCategoryIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const directoryCurrentLength = data?.directory?.length || 0

  const fetchMoreResults = React.useCallback(() => {
    fetchMore({ variables: { skip: directoryCurrentLength } })
  }, [directoryCurrentLength, fetchMore])

  const value = React.useMemo<State>(
    () => ({
      selectedCategoryIds,
      toggleCategory,
      fetchMoreResults,
    }),
    [fetchMoreResults, selectedCategoryIds, toggleCategory],
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
