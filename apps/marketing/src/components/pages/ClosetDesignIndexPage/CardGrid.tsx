import React from 'react'

interface Props {
  children: React.ReactNode
}

const CardGrid = ({ children }: Props) => {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 @3xl:grid-cols-4 gap-6">
        {children}
      </div>
    </div>
  )
}

export default CardGrid
