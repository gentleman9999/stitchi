import { Skeleton } from '@components/ui'
import React from 'react'
import SwatchGroup from './SwatchGroup'

const CatalogProductSkeleton = () => {
  return (
    <div className="block rounded-md border-2 border-gray-100 p-4">
      <Skeleton height={200} />
      <Skeleton width="70%" className="mt-2" />
      <div className="mt-2">
        <SwatchGroup
          hexColors={['#e9e9e9', '#b6b6b6', '#818181', '#535353', '#202020']}
        />
      </div>
    </div>
  )
}

export default CatalogProductSkeleton
