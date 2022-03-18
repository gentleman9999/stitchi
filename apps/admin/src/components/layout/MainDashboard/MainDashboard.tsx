import React from 'react'
import Navigation from './Navigation'
import { Box } from '@components/ui'

const MainDashboard: React.FC = ({ children }) => {
  return (
    <>
      <Navigation />
      <Box sx={{ padding: 2 }} />
      {children}
    </>
  )
}

export default MainDashboard
