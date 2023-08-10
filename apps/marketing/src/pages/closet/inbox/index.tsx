import { ClosetLayout } from '@components/layout'
import ClosetInboxIndexPage from '@components/pages/ClosetInboxIndexPage'
import React from 'react'

const Page = () => {
  return <ClosetInboxIndexPage />
}

Page.getLayout = (page: React.ReactElement) => (
  <ClosetLayout>{page}</ClosetLayout>
)

export default Page
