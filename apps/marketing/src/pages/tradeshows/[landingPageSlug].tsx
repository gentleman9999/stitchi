import CmsLandingPage, {
  makeGetStaticPaths,
  getStaticProps,
} from '@components/common/CmsLandingPage'
import { PrimaryLayout } from '@components/layout'
import routes from '@lib/routes'
import { useRouter } from 'next/router'
import React from 'react'

const getStaticPaths = makeGetStaticPaths('tradeshow')

const Page = () => {
  const router = useRouter()

  const landingPageSlug = router.query.landingPageSlug as string

  return (
    <CmsLandingPage
      href={routes.internal.tradeshows.show.href({
        tradeshowSlug: landingPageSlug,
      })}
      parentBreadcrumbs={[
        {
          href: routes.internal.tradeshows.href(),
          label: 'Tradeshows',
        },
      ]}
    />
  )
}

Page.getLayout = (page: React.ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default Page

export { getStaticPaths, getStaticProps }
