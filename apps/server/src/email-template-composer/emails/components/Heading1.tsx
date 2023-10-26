import { Heading } from '@react-email/components'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Heading1 = ({ children }: Props) => (
  <Heading as="h1" className="text-2xl font-medium">
    {children}
  </Heading>
)

export default Heading1
