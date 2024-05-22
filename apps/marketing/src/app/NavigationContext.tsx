'use client'

import React from 'react'

interface State {
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

const NavigationContext = React.createContext<State | undefined>(undefined)

interface Props {
  children: React.ReactNode
}

const NavigationContextProvider = ({ children }: Props) => {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <NavigationContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigation = () => {
  const context = React.useContext(NavigationContext)

  if (context === undefined) {
    throw new Error(
      'useNavigation must be used within a NavigationContextProvider',
    )
  }

  return context
}

export default NavigationContextProvider
