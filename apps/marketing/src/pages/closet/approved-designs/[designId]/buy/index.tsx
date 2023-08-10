import ClosetDesignBuyPage from '@components/pages/ClosetDesignBuyPage'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { FocusedLayout } from '@components/layout'
import { withAuthentication } from '@lib/auth'

const Page = () => {
  const router = useRouter()

  const { designId } = router.query

  if (typeof designId !== 'string') {
    return null
  }

  return <ClosetDesignBuyPage designId={designId} />
}

Page.getLayout = (page: ReactElement) => <FocusedLayout>{page}</FocusedLayout>

export default withAuthentication(Page)
