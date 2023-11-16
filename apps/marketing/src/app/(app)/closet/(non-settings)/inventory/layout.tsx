import React from 'react'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import LayoutPanel from './LayoutPanel'
import LayoutMain from './LayoutMain'
import LayoutHeader from './LayoutHeader'

interface Props {
  children: React.ReactNode
  sidePanel: React.ReactNode
  mainContent: React.ReactNode
}

const Layout = ({ children, sidePanel, mainContent }: Props) => {
  return (
    <ClosetPageContainer className="@container">
      <LayoutHeader>{children}</LayoutHeader>
      <div className="flex gap-4">
        <LayoutMain>{mainContent}</LayoutMain>
        <LayoutPanel>{sidePanel}</LayoutPanel>
      </div>
    </ClosetPageContainer>
  )
}

export default Layout
