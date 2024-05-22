'use client'

import React from 'react'

interface State {
  show: () => void
  hide: () => void
}

const PopperContext = React.createContext<State | undefined>(undefined)

interface PopperProviderProps {
  children: React.ReactNode
  show: () => void
  hide: () => void
}

const PopperProvider = ({ children, show, hide }: PopperProviderProps) => {
  return (
    <PopperContext.Provider value={{ show, hide }}>
      {children}
    </PopperContext.Provider>
  )
}

export const usePopper = () => {
  const context = React.useContext(PopperContext)
  if (!context) {
    throw new Error('usePopper must be used within a PopperProvider')
  }
  return context
}

export default PopperProvider
