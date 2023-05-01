import { PrimaryLayout } from '@components/layout'
import { SolutionsLoyaltyAndReferralPrograms } from '@components/pages'
import React, { ReactElement } from 'react'

const Page = () => {
  return <SolutionsLoyaltyAndReferralPrograms />
}

Page.getLayout = (page: ReactElement) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page
