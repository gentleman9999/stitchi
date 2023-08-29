import { Heading } from '@react-email/components'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Heading2 = ({ children }: Props) => (
  <Heading as="h2" className="text-lg font-semibold">
    {children}
  </Heading>
)

export default Heading2
