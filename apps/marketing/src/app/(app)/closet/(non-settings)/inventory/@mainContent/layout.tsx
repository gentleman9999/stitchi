import ClosetSection from '@components/common/ClosetSection'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return <ClosetSection>{children}</ClosetSection>
}

export default Layout
