import React from 'react'
import SwatchGroup from '../../../../../components/common/SwatchGroup'
import Skeleton from '@components/ui/Skeleton'

const CatalogProductSkeleton = () => {
  return (
    <li className="block rounded-md border-2 p-4">
      <Skeleton height={320} className="w-full" />
      <Skeleton width="70%" className="mt-2" />
      <div className="mt-2">
        <SwatchGroup
          hexColors={['#e9e9e9', '#b6b6b6', '#818181', '#535353', '#202020']}
        />
      </div>
    </li>
  )
}

export default CatalogProductSkeleton
