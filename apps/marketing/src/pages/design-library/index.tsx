import { PrimaryLayout } from '@components/layout'
import { DesignLibraryPage } from '@components/pages'
import React, { ReactElement } from 'react'

const Page = () => {
  return <DesignLibraryPage />
}

Page.getLayout = (page: ReactElement) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page
