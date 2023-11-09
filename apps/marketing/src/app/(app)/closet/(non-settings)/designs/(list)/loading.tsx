import ClosetCardGrid from '@components/common/ClosetCardGrid'
import React from 'react'
import CardLoadingSkeleton from './CardLoadingSkeleton'

const Loading = () => {
  return (
    <ClosetCardGrid>
      {Array.from({ length: 8 }).map((_, index) => (
        <CardLoadingSkeleton key={index} />
      ))}
    </ClosetCardGrid>
  )
}

export default Loading
