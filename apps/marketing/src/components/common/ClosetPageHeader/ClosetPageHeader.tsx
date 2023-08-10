import React from 'react'

interface Props {
  children: React.ReactNode
}

const ClosetPageHeader = ({ children }: Props) => {
  return <div>{children}</div>
}

export default ClosetPageHeader
