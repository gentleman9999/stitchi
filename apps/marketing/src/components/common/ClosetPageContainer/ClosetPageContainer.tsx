import React from 'react'

interface Props {
  children: React.ReactNode
}

const ClosetPageConatiner = ({ children }: Props) => {
  return <div className="mt-6">{children}</div>
}

export default ClosetPageConatiner
