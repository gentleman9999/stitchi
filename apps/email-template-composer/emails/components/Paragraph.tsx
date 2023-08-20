import React from 'react'

interface Props {
  children: React.ReactNode
}

const Paragraph = ({ children }: Props) => (
  <p className="text-base font-regular text-left text-gray-500">{children}</p>
)

export default Paragraph
