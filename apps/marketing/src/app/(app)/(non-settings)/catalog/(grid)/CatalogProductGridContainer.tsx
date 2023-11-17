import React from 'react'

interface Props {
  children: React.ReactNode
}

const CatalogProductGridContainer = ({ children }: Props) => {
  return (
    <div className="@container w-full">
      <ul className="grid grid-cols-1 @lg:grid-cols-2 @2xl:grid-cols-3 @4xl:grid-cols-4 @6xl:grid-cols-5 @7xl:grid-cols-6 gap-4 @4xl:gap-8">
        {children}
      </ul>
    </div>
  )
}

export default CatalogProductGridContainer
