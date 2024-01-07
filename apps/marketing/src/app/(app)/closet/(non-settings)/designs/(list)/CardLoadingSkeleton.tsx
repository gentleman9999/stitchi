import Skeleton from '@components/ui/Skeleton'
import React from 'react'

const CardLoadingSkeleton = () => {
  return (
    <div className="rounded-sm border flex flex-col w-full bg-paper">
      <Skeleton
        containerClassName="flex aspect-square rounded-sm"
        className="h-full"
      />

      <div className="p-4">
        <h2>
          <Skeleton className="w-16" />
        </h2>
        <span>
          <Skeleton width={80} height={10} />
        </span>
      </div>
    </div>
  )
}

export default CardLoadingSkeleton
