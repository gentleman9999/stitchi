import ClosetPageHeader from '@components/common/ClosetPageHeader'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return <ClosetPageHeader>{children}</ClosetPageHeader>
}

export default Layout
