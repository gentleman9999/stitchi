import { ClosetLayout } from '@components/layout'
import ClosetDesignCreatePage from '@components/pages/ClosetDesignCreatePage'
import { withAuthentication } from '@lib/auth'
import React from 'react'

const Page = () => {
  return <ClosetDesignCreatePage />
}

Page.getLayout = (page: React.ReactElement) => {
  return <ClosetLayout>{page}</ClosetLayout>
}

export default withAuthentication(Page)
