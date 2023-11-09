import React from 'react'
import ClosetDesignIndexPageDesignRequestCard from '../../ClosetDesignIndexPageDesignRequestCard'

const Loading = () => {
  return (
    <div className="flex gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="w-[230px] shrink-0 flex">
          <ClosetDesignIndexPageDesignRequestCard
            loading
            designRequest={null}
          />
        </div>
      ))}
    </div>
  )
}

export default Loading
