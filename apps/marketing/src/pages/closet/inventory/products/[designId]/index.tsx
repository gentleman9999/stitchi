import { ClosetLayout } from '@components/layout'
import ClosetInventoryIndexPage from '@components/pages/ClosetInventoryIndexPage'
import ClosetInventoryShowPage from '@components/pages/ClosetInventoryShowPage'
import { useRouter } from 'next/router'
import React from 'react'

const Page = () => {
  const router = useRouter()

  const designId = router.query.designId

  if (typeof designId !== 'string') return null

  return (
    <>
      <ClosetInventoryIndexPage />
      <ClosetInventoryShowPage designId={designId} />
    </>
  )
}

Page.getLayout = (page: React.ReactElement) => (
  <ClosetLayout>{page}</ClosetLayout>
)

export default Page
