import React from 'react'

interface Props {
  children: React.ReactNode
}

const Heading1 = ({ children }: Props) => (
  <h1 className="text-xl font-bold text-left">{children}</h1>
)

export default Heading1
