import { TableFilterDateProps } from '@components/ui/Table/TableFilterDate'
import { TableFilterUserProps } from '@components/ui/Table/TableFilterUser'
import { useQueryState } from 'next-usequerystate'
import React from 'react'

interface Filters {
  date: TableFilterDateProps['value'] | null
  user: TableFilterUserProps['value'] | null
}

interface State {
  filters: Filters
  setDateFilter: (date: TableFilterDateProps['value'] | null) => void
  setUserFilter: (user: TableFilterUserProps['value'] | null) => void
}

const ClosetClontext = React.createContext<State | undefined>(undefined)

const ClosetProvider = ({
  children,
  defaultUserFilter,
}: {
  children: React.ReactNode
  defaultUserFilter?: TableFilterUserProps['value']
}) => {
  const [dateFilter, setDateFilter] = useQueryState<
    TableFilterDateProps['value'] | null
  >('date', {
    defaultValue: null,
    parse: (value: string) => {
      try {
        return JSON.parse(value)
      } catch {
        return null
      }
    },
    serialize: (value: TableFilterDateProps['value'] | null) => {
      return JSON.stringify(value)
    },
  })

  const [userFilter, setUserFilter] = useQueryState<
    TableFilterUserProps['value'] | null
  >('user', {
    defaultValue: null,
    parse: (value: string) => {
      try {
        return JSON.parse(value)
      } catch {
        return null
      }
    },
    serialize: (value: TableFilterUserProps['value'] | null) => {
      return JSON.stringify(value)
    },
  })

  React.useEffect(() => {
    if (defaultUserFilter) {
      setUserFilter(defaultUserFilter)
    }
  }, [defaultUserFilter, setUserFilter])

  const state = React.useMemo(() => {
    return {
      setDateFilter,
      setUserFilter,
      filters: {
        date: dateFilter,
        user: userFilter,
      },
    }
  }, [dateFilter, setDateFilter, setUserFilter, userFilter])

  return (
    <ClosetClontext.Provider value={state}>{children}</ClosetClontext.Provider>
  )
}

const useCloset = () => {
  const context = React.useContext(ClosetClontext)

  if (context === undefined) {
    throw new Error('useCloset must be used within a ClosetProvider')
  }

  return context
}

export { ClosetProvider, useCloset }
