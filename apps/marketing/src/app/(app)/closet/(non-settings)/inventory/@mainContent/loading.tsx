import ClosetCardGrid from '@components/common/ClosetCardGrid'
import React from 'react'
import ClosetCard from '@components/common/ClosetCard'

const Loading = () => {
  return (
    <ClosetCardGrid>
      <>
        {Array.from({ length: 10 }).map((_, index) => (
          <ClosetCard key={index} loading={true} />
        ))}
      </>
    </ClosetCardGrid>
  )
}

export default Loading
