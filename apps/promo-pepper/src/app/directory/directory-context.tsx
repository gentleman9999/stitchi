import { notEmpty } from '@/utils/typescript'
import { FragmentType, getFragmentData, gql } from '@/__generated__'
import React from 'react'

interface Filter {
  id: string
  label: string
  slug: string
  active: boolean
}

interface State {
  filters: Map<string, Filter>
  toggleFilter: (filterId: string) => void
}

const DirectoryContext = React.createContext<State | undefined>(undefined)

const DirectoryProvider = ({
  children,
  query,
}: {
  children: React.ReactNode
  query: FragmentType<typeof DirectoryContextFragment>
}) => {
  const [filters, setFilters] = React.useState<Map<string, Filter>>(
    createFilterMap(query),
  )

  React.useEffect(() => {
    setFilters(createFilterMap(query))
  }, [query])

  const toggleFilter = React.useCallback(
    (filterId: string) => {
      const currentFilter = filters.get(filterId)

      if (currentFilter) {
        const newFilters = new Map(Array.from(filters))
        newFilters.set(filterId, {
          ...currentFilter,
          active: !currentFilter.active,
        })

        setFilters(newFilters)
      }
    },
    [filters],
  )

  const value = React.useMemo(
    () => ({ filters, toggleFilter }),
    [filters, toggleFilter],
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

const categoryReducer = (acc: Map<string, Filter>, category?: Category) => {
  if (category?.children) {
    category.children.filter(notEmpty).reduce(categoryReducer, acc)
  }

  const { id, slug, title } = category || {}

  if (slug && title && id) {
    acc.set(id, { id, label: title, slug, active: false })
  }

  return acc
}

const createFilterMap = (
  queryFragment?: FragmentType<typeof DirectoryContextFragment> | null,
) => {
  const query = getFragmentData(DirectoryContextFragment, queryFragment)

  const { topLevelCategories } = query || {}

  return (
    topLevelCategories?.reduce(categoryReducer, new Map<string, Filter>()) ||
    new Map()
  )
}

export const DirectoryContextFragment = gql(/* GraphQL */ `
  fragment DirectoryContextFragment on Query {
    topLevelCategories: allGlossaryCategories(
      filter: { parent: { exists: false } }
    ) {
      id
      slug
      title
      description
      children {
        id
        slug
        title
        description
      }
      ...FilterDialogDirectoryGategoriesFragment
    }
  }
`)
