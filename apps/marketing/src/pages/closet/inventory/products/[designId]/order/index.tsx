import ClosetDesignBuyPage from '@components/pages/ClosetDesignBuyPage'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { ClosetLayout } from '@components/layout'
import ClosetDesignShowPage from '@components/pages/ClosetDesignShowPage'

const Page = () => {
  const router = useRouter()

  const { designId } = router.query

  if (typeof designId !== 'string') {
    return null
  }

  return (
    <>
      <ClosetDesignShowPage designId={designId} />
      <ClosetDesignBuyPage designId={designId} />
    </>
  )
}

Page.getLayout = (page: ReactElement) => <ClosetLayout>{page}</ClosetLayout>

export default Page