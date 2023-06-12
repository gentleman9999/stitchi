import ClosetOrdersIndexPage from '@components/common/ClosetOrdersIndexPage'
import { ClosetLayout } from '@components/layout'
import { withAuthentication } from '@lib/auth'
import React from 'react'

const Page = () => {
  return <ClosetOrdersIndexPage />
}

Page.getLayout = (page: React.ReactElement) => (
  <ClosetLayout>{page}</ClosetLayout>
)

export default withAuthentication(Page)
