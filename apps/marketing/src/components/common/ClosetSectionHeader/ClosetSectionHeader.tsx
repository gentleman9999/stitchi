import React from 'react'

interface Props {
  children: React.ReactNode
}

const ClosetSectionHeader = ({ children }: Props) => {
  return <div className="border-b mb-8">{children}</div>
}

export default ClosetSectionHeader
