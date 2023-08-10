import { ClosetLayout } from '@components/layout'
import ClosetInventoryIndexPage from '@components/pages/ClosetInventoryIndexPage'
import React from 'react'

const Page = () => {
  return <ClosetInventoryIndexPage />
}

Page.getLayout = (page: React.ReactElement) => (
  <ClosetLayout>{page}</ClosetLayout>
)

export default Page
