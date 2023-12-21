import CmsLandingPage, {
  makeGetStaticPaths,
  getStaticProps,
} from '@components/common/CmsLandingPage'
import { PrimaryLayout } from '@components/layout'
import routes from '@lib/routes'
import { useRouter } from 'next/router'
import React from 'react'

const getStaticPaths = makeGetStaticPaths('industry')

const Page = () => {
  const router = useRouter()

  const landingPageSlug = router.query.landingPageSlug as string

  return (
    <CmsLandingPage
      href={routes.internal.industries.show.href(landingPageSlug)}
    />
  )
}

Page.getLayout = (page: React.ReactElement) => (
  <PrimaryLayout disableNavSpacing>{page}</PrimaryLayout>
)

export default Page

export { getStaticPaths, getStaticProps }
