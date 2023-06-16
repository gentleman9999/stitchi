import { ClosetLayout } from '@components/layout'
import ClosetDesignShowPage from '@components/pages/ClosetDesignShowPage'
import { withAuthentication } from '@lib/auth'
import { useRouter } from 'next/router'
import React from 'react'

const Page = () => {
  const { query } = useRouter()

  const designId = typeof query.designId === 'string' ? query.designId : null

  if (!designId) {
    return null
  }

  return <ClosetDesignShowPage designId={designId} />
}

Page.getLayout = (page: React.ReactElement) => {
  return <ClosetLayout>{page}</ClosetLayout>
}

export default withAuthentication(Page)
