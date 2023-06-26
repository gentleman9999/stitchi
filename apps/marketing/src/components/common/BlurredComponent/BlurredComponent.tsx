import React from 'react'

interface Props {
  message?: React.ReactNode
}

const BlurredComponent = ({ message }: Props) => {
  return (
    <div className="absolute inset-0 z-10 backdrop-blur-sm -m-3 flex justify-center p-4">
      <div className="max-w-md">{message}</div>
    </div>
  )
}

export default BlurredComponent
