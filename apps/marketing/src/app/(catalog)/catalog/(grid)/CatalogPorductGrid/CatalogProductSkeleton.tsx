import React from 'react'
import SwatchGroup from '../../../../../components/common/SwatchGroup'
import Skeleton from '@components/ui/Skeleton'

const CatalogProductSkeleton = () => {
  return (
    <li className="rounded-md flex flex-col">
      <Skeleton className="w-full aspect-[2/3]" />
      <div className="py-2 flex-1 flex flex-col">
        <h3 className="text-sm font-normal leading-tight">
          <Skeleton width="70%" />
        </h3>

        <div className="mt-4 flex justify-between items-end flex-wrap flex-1">
          <SwatchGroup
            hexColors={['#e9e9e9', '#b6b6b6', '#818181', '#535353', '#202020']}
          />
        </div>
      </div>
    </li>
  )
}

export default CatalogProductSkeleton
