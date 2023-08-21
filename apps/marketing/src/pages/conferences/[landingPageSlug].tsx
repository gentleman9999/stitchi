import CmsLandingPage, {
  makeGetStaticPaths,
  getStaticProps,
} from '@components/common/CmsLandingPage'
import { PrimaryLayout } from '@components/layout'
import React from 'react'

const getStaticPaths = makeGetStaticPaths('conference')

const Page = () => {
  return <CmsLandingPage />
}

Page.getLayout = (page: React.ReactElement) => (
  <PrimaryLayout disableNavSpacing>{page}</PrimaryLayout>
)

export default Page

export { getStaticPaths, getStaticProps }
