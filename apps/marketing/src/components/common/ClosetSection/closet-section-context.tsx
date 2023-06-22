import { useRouter } from 'next/router'
import React from 'react'

type ID = number | string

interface Tab<T extends ID> {
  readonly id: T
  readonly label: string
  readonly href: string
}

interface State<T extends ID> {
  activeTab: Tab<T> | null
  tabs: Tab<T>[]
  setActiveTab: (id: T) => void
}

const ClosetSectionContext = React.createContext<State<ID> | undefined>(
  undefined,
)

interface Props<T extends ID> {
  children: React.ReactNode
  tabs?: Tab<T>[]
}

const ClosetSectionProvider = <T extends ID>({
  children,
  tabs = [],
}: Props<T>) => {
  const router = useRouter()

  const activeTab = tabs.find(tab => tab.href === router.asPath) || null

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
      value={{ tabs, activeTab, setActiveTab: handleSetActiveTab }}
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

export { useClosetSectionContext, ClosetSectionProvider }
