import React from 'react'

interface Props {
  children: React.ReactNode
}

const ClosetCardGrid = ({ children }: Props) => {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5 @7xl:grid-cols-6 gap-4">
        {children}
      </div>
    </div>
  )
}

export default ClosetCardGrid
