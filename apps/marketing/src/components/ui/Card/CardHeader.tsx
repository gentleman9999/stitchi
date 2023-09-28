import React from 'react'

interface Props {
  children: React.ReactNode
}

const CardHeader = ({ children }: Props) => {
  return <div className="pt-4 px-4 md:pt-6 md:px-6">{children}</div>
}

export default CardHeader
