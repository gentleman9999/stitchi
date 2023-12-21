import CmsLandingPage, {
  makeGetStaticPaths,
  getStaticProps,
} from '@components/common/CmsLandingPage'
import { PrimaryLayout } from '@components/layout'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import { useRouter } from 'next/router'
import React from 'react'

const getStaticPaths = makeGetStaticPaths('industry')

const Page = () => {
  const router = useRouter()

  const landingPageSlug = router.query.landingPageSlug as string

  const canonicalUrl = makeAbsoluteUrl(
    routes.internal.industries.show.href(landingPageSlug),
  )

  return <CmsLandingPage canonicalUrl={canonicalUrl} />
}

Page.getLayout = (page: React.ReactElement) => (
  <PrimaryLayout disableNavSpacing>{page}</PrimaryLayout>
)

export default Page

export { getStaticPaths, getStaticProps }
