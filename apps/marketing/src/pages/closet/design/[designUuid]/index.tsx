import { ClosetLayout } from '@components/layout'
import ClosetDesignShowPage from '@components/pages/ClosetDesignShowPage'
import { withAuthentication } from '@lib/auth'
import React from 'react'

const Page = () => {
  return <ClosetDesignShowPage />
}

Page.getLayout = (page: React.ReactElement) => {
  return <ClosetLayout>{page}</ClosetLayout>
}

export default withAuthentication(Page)
