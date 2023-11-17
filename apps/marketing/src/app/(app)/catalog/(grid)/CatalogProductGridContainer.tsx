import React from 'react'

interface Props {
  children: React.ReactNode
}

const CatalogProductGridContainer = ({ children }: Props) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {children}
    </ul>
  )
}

export default CatalogProductGridContainer
