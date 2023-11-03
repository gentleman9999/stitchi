'use client'
import React from 'react'

interface State {
  activeColorId: string | null
  setActiveColorId: (activeColorId: string | null) => void
}

const ProductContext = React.createContext<State | undefined>(undefined)

interface Props {
  children: React.ReactNode
}

const ProductProvider = ({ children }: Props) => {
  const [activeColorId, setActiveColorId] = React.useState<string | null>(null)

  return (
    <ProductContext.Provider
      value={{
        activeColorId,
        setActiveColorId,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

const useProductContext = () => {
  const context = React.useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }
  return context
}

export { ProductProvider, useProductContext }
