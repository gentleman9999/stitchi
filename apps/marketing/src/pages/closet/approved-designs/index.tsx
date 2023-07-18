import ClosetDesignIndexPage from '@components/pages/ClosetDesignIndexPage'
import { withAuthentication } from '@lib/auth'
import React from 'react'
import { ClosetLayout } from '@components/layout'

const Page = () => {
  return <ClosetDesignIndexPage />
}

Page.getLayout = (page: React.ReactElement) => (
  <ClosetLayout>{page}</ClosetLayout>
)

export default withAuthentication(Page)
