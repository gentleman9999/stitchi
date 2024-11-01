import React from 'react'
import CatalogProductGridContainer from './CatalogProductGridContainer'
import CatalogProductSkeleton from './CatalogProductSkeleton'

const CatalogProductGridSkeleton = () => {
  return (
    <CatalogProductGridContainer>
      {Array.from(new Array(12)).map((_, i) => (
        <CatalogProductSkeleton key={i} />
      ))}
    </CatalogProductGridContainer>
  )
}

export default CatalogProductGridSkeleton
