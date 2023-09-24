import { ClosetLayout } from '@components/layout'
import ClosetDashboardPage from '@components/pages/ClosetDashboardPage'
import React from 'react'

const Page = () => {
  return <ClosetDashboardPage />
}

Page.getLayout = (page: React.ReactElement) => (
  <ClosetLayout>{page}</ClosetLayout>
)

export default Page
