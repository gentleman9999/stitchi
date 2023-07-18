import { ClosetLayout } from '@components/layout'
import ClosetDesignShowPage from '@components/pages/ClosetDesignShowPage'
import { withAuthentication } from '@lib/auth'
import { useRouter } from 'next/router'
import React from 'react'

const Page = () => {
  const router = useRouter()

  const designId = router.query.designId

  if (typeof designId !== 'string') return null

  return <ClosetDesignShowPage designId={designId} />
}

Page.getLayout = (page: React.ReactElement) => (
  <ClosetLayout>{page}</ClosetLayout>
)

export default withAuthentication(Page)
