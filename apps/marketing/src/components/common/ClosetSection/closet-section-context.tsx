'use client'

import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

type ID = number | string

export interface Tab<T extends ID> {
  readonly id: T
  readonly label: string
  readonly href: string
}

interface State<T extends ID> {
  activeTab: Tab<T> | null
  tabs: Tab<T>[]
  setActiveTab: (id: T) => void
  loading: boolean
}

const ClosetSectionContext = React.createContext<State<ID> | undefined>(
  undefined,
)

interface Props<T extends ID> {
  children: React.ReactNode
  tabs?: Tab<T>[]
  loading?: boolean
}

const ClosetSectionProvider = <T extends ID>({
  children,
  tabs = [],
  loading = false,
}: Props<T>) => {
  const router = useRouter()
  const pathname = usePathname()

  const activeTab = pathname ? getLongestMatch(pathname, tabs) : null

  const handleSetActiveTab = React.useCallback(
    (id: ID) => {
      const foundTab = tabs.find(tab => tab.id === id)
      if (foundTab) {
        router.push(foundTab.href)
      }
    },
    [router, tabs],
  )

  return (
    <ClosetSectionContext.Provider
      value={{ tabs, activeTab, setActiveTab: handleSetActiveTab, loading }}
    >
      {children}
    </ClosetSectionContext.Provider>
  )
}

const useClosetSectionContext = () => {
  const context = React.useContext(ClosetSectionContext)
  if (!context) {
    throw new Error(
      'useClosetSectionContext must be used within a ClosetSectionContext',
    )
  }

  return context
}

const getLongestMatch = (href: string, tabs: Tab<ID>[]): Tab<ID> | null => {
  let longestMatchLength = 0
  let longestMatch: Tab<ID> | null = null

  tabs.forEach(tab => {
    if (href.includes(tab.href) && tab.href.length > longestMatchLength) {
      longestMatch = tab
      longestMatchLength = tab.href.length
    }
  })

  return longestMatch
}

export { useClosetSectionContext, ClosetSectionProvider }
