'use client'

import { usePathname } from 'next/navigation'
import React, { SetStateAction } from 'react'

interface State {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<SetStateAction<boolean>>
}

const AppLayoutContext = React.createContext<State | undefined>(undefined)

interface Props {
  children: React.ReactNode
}

const AppLayoutContextProvider = (props: Props) => {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  React.useEffect(() => {
    const handleRouteChange = () => {
      setSidebarOpen(false)
    }

    if (pathname) {
      handleRouteChange()
    }
  }, [pathname])

  return (
    <AppLayoutContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {props.children}
    </AppLayoutContext.Provider>
  )
}

const useAppLayoutContext = () => {
  const context = React.useContext(AppLayoutContext)

  if (context === undefined) {
    throw new Error(
      'useAppLayoutContext must be used within a AppLayoutContextProvider',
    )
  }

  return context
}

export { AppLayoutContextProvider, useAppLayoutContext }
