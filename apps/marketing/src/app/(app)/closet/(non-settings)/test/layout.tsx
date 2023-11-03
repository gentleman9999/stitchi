import ClosetPageContainer from '@components/common/ClosetPageContainer'
import React from 'react'
import LayoutPanel from './LayoutPanel'

interface Props {
  children: React.ReactNode
  panel: React.ReactNode
  mainContent: React.ReactNode
}

const Layout = ({ children, panel, mainContent }: Props) => {
  return (
    <ClosetPageContainer>
      <div className="flex flex-col gap-4">
        <div className="bg-blue-300 p-8">{children}</div>
        <div className="flex gap-4">
          <div className="flex-1 bg-red-300 p-8 transition-all">
            {mainContent}
          </div>
          <LayoutPanel panel={panel} />
        </div>
      </div>
    </ClosetPageContainer>
  )
}

export default Layout
