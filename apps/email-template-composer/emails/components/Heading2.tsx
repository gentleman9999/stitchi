import React from 'react'

interface Props {
  children: React.ReactNode
}

const Heading2 = ({ children }: Props) => (
  <h2 className="text-lg font-semibold text-left">{children}</h2>
)

export default Heading2
