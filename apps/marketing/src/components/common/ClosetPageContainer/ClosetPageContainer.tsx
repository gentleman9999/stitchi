import React from 'react'

interface Props {
  children: React.ReactNode
}

const ClosetPageContainer = ({ children }: Props) => {
  return <div className="px-6 w-full min-h-screen">{children}</div>
}

export default ClosetPageContainer
