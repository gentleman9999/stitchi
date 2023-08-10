import { ClosetLayout } from '@components/layout'
import ClosetBrandIndexPage from '@components/pages/ClosetBrandIndexPage'
import React from 'react'

const Page = () => {
  return <ClosetBrandIndexPage />
}

Page.getLayout = (page: React.ReactNode) => <ClosetLayout>{page}</ClosetLayout>

export default Page
