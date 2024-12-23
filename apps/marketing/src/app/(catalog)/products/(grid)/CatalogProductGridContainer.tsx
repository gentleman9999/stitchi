import React from 'react'

interface Props {
  children: React.ReactNode
}

const CatalogProductGridContainer = ({ children }: Props) => {
  return (
    <div className="@container w-full">
      <ul className="grid grid-cols-2 @2xl:grid-cols-3 @4xl:grid-cols-4 @6xl:grid-cols-5 gap-x-4 gap-y-6 @4xl:gap-y-12 @4xl:gap-x-8">
        {children}
      </ul>
    </div>
  )
}

export default CatalogProductGridContainer
