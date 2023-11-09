import Skeleton from '@components/ui/Skeleton'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton height={180} width="100%" />
      <Skeleton height={60} width="100%" />
    </div>
  )
}

export default Loading
