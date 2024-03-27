import React from 'react'
import CatalogProductGridContainer from '../old/(grid)/CatalogPorductGrid/CatalogProductGridContainer'
import CatalogProductSkeleton from '../old/(grid)/CatalogPorductGrid/CatalogProductSkeleton'

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
