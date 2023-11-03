import React from 'react'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import LayoutPanel from './LayoutPanel'

interface Props {
  children: React.ReactNode
  sidePanel: React.ReactNode
  mainContent: React.ReactNode
}

const Layout = ({ children, sidePanel, mainContent }: Props) => {
  return (
    <ClosetPageContainer>
      {children}
      <div className="flex gap-12">
        <div className="flex-1">{mainContent}</div>
        <LayoutPanel sidePanel={sidePanel} />
      </div>
    </ClosetPageContainer>
  )
}

export default Layout
