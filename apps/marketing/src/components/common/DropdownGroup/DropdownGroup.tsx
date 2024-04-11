import React from 'react'
import { DropdownGroupProvider } from './dropdown-group-context'

interface Props {
  children: React.ReactNode
}

const DropdownGroup = ({ children }: Props) => {
  return <DropdownGroupProvider>{children}</DropdownGroupProvider>
}

export default DropdownGroup
