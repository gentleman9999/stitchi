import { ClosetLayout } from '@components/layout'
import ClosetHomePage from '@components/pages/ClosetHomePage'
import { withAuthentication } from '@lib/auth'
import React from 'react'

const Page = () => {
  return <ClosetHomePage />
}

Page.getLayout = (page: React.ReactElement) => (
  <ClosetLayout>{page}</ClosetLayout>
)

export default withAuthentication(Page)
