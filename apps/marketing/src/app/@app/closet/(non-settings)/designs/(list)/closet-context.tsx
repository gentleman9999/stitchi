'use client'

import { TableFilterDateProps } from '@components/ui/Table/TableFilterDate'
import { TableFilterUserProps } from '@components/ui/Table/TableFilterUser'
import { useQueryState } from 'next-usequerystate'
import React from 'react'

interface Filters {
  date: TableFilterDateProps['value'] | null
  user: TableFilterUserProps['value'] | null
  artist: TableFilterUserProps['value'] | null
}

interface State {
  filters: Filters
  setDateFilter: (date: TableFilterDateProps['value'] | null) => void
  setUserFilter: (user: TableFilterUserProps['value'] | null) => void
  setArtistFilter: (artist: TableFilterUserProps['value'] | null) => void
}

const ClosetClontext = React.createContext<State | undefined>(undefined)

const ClosetProvider = ({
  children,
  defaultArtistFilter,
}: {
  children: React.ReactNode
  defaultArtistFilter?: TableFilterUserProps['value']
}) => {
  const [dateFilter, setDateFilter] = useQueryState<
    TableFilterDateProps['value'] | null
  >('date', {
    shallow: false,
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
    shallow: false,
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

  const [artistFilter, setArtistFilter] = useQueryState<
    TableFilterUserProps['value'] | null
  >('artist', {
    shallow: false,
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
    if (defaultArtistFilter) {
      setArtistFilter(defaultArtistFilter)
    }
  }, [defaultArtistFilter, setArtistFilter])

  const state = React.useMemo(() => {
    return {
      setDateFilter,
      setUserFilter,
      setArtistFilter,
      filters: {
        date: dateFilter,
        user: userFilter,
        artist: artistFilter,
      },
    }
  }, [
    artistFilter,
    dateFilter,
    setArtistFilter,
    setDateFilter,
    setUserFilter,
    userFilter,
  ])

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
