import { ClosetLayout } from '@components/layout'
import ClosetDesignsOverviewPage from '@components/pages/ClosetDesignsOverviewPage'
import React from 'react'

const Page = () => {
  return <ClosetDesignsOverviewPage />
}

Page.getLayout = (page: React.ReactElement) => (
  <ClosetLayout>{page}</ClosetLayout>
)

export default Page
