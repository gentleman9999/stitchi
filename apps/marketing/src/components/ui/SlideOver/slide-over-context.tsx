'use client'

import React from 'react'

interface State {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SlideOverContext = React.createContext<State | undefined>(undefined)

interface Props {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SlideOverProvider = ({ children, open, onOpenChange }: Props) => {
  return (
    <SlideOverContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SlideOverContext.Provider>
  )
}

const useSlideOver = () => {
  const context = React.useContext(SlideOverContext)
  if (context === undefined) {
    throw new Error('useSlideOver must be used within a SlideOverProvider')
  }
  return context
}

export { SlideOverProvider, useSlideOver }
