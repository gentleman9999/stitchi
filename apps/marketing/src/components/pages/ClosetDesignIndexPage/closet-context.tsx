import { TableFilterDateProps } from '@components/ui/Table/TableFilterDate'
import { useQueryState } from 'next-usequerystate'
import React from 'react'

interface Filters {
  date: TableFilterDateProps['value'] | null
}

interface State {
  filters: Filters
  setDateFilter: (date: TableFilterDateProps['value'] | null) => void
}

const ClosetClontext = React.createContext<State | undefined>(undefined)

const ClosetProvider = ({ children }: { children: React.ReactNode }) => {
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

  const state = React.useMemo(() => {
    return {
      setDateFilter,
      filters: {
        date: dateFilter,
      },
    }
  }, [dateFilter, setDateFilter])

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
