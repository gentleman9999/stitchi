import { PrimaryLayout } from '@components/layout'
import { IndustryNewsletterLandingPage } from '@components/pages'
import React, { ReactElement } from 'react'

const NewsletterMerchProgram = () => {
  return <IndustryNewsletterLandingPage />
}

NewsletterMerchProgram.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default NewsletterMerchProgram
