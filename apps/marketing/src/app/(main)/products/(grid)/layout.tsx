import ClosetPageContainer from '@components/common/ClosetPageContainer'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClosetPageContainer className="max-w-none flex flex-col gap-4 mt-4 mb-4">
      {children}
    </ClosetPageContainer>
  )
}

export default Layout
