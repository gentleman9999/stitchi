'use client'

import React from 'react'

interface State {
  open: () => void
  close: () => void
}

const PopperContext = React.createContext<State | undefined>(undefined)

interface PopperProviderProps {
  children: React.ReactNode
  open: () => void
  close: () => void
}

const PopperProvider = ({ children, open, close }: PopperProviderProps) => {
  return (
    <PopperContext.Provider value={{ open, close }}>
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
