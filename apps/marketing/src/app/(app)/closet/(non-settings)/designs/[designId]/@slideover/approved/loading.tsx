import React from 'react'
import Skeleton from 'react-loading-skeleton'

const Loading = () => {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton height={180} width="100%" />
      <Skeleton height={60} width="100%" />
    </div>
  )
}

export default Loading
