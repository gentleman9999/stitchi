'use client'

import React from 'react'

interface State {
  activeDropdownId: string | null
  setActiveDropdownId: (id: string | null) => void
}

const DropdownGroupContext = React.createContext<State | undefined>(undefined)

interface Props {
  children: React.ReactNode
}

const DropdownGroupProvider = ({ children }: Props) => {
  const [activeDropdownId, setActiveDropdownId] = React.useState<string | null>(
    null,
  )

  return (
    <DropdownGroupContext.Provider
      value={{ activeDropdownId, setActiveDropdownId }}
    >
      {children}
    </DropdownGroupContext.Provider>
  )
}

const useDropdownGroup = () => {
  const context = React.useContext(DropdownGroupContext)

  if (!context) {
    throw new Error(
      'useDropdownGroup must be used within a DropdownGroupProvider',
    )
  }

  return context
}

export { DropdownGroupProvider, useDropdownGroup }
