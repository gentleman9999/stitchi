import ClosetOrdersIndexPage from '@components/pages/ClosetOrdersIndexPage'
import { ClosetLayout } from '@components/layout'
import React from 'react'

const Page = () => {
  return <ClosetOrdersIndexPage />
}

Page.getLayout = (page: React.ReactElement) => (
  <ClosetLayout>{page}</ClosetLayout>
)

export default Page
