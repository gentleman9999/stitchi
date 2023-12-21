import { gql } from '@apollo/client'
import CmsLandingPageV2 from '@components/common/CmsLandingPageV2'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import { useRouter } from 'next/router'
import React from 'react'

const Page = () => {
  const canonicalUrl = makeAbsoluteUrl(routes.internal.tradeshows.href())

  return <CmsLandingPageV2 canonicalUrl={canonicalUrl} />
}

const GET_DATA = gql`
  query TradeShowIndexPageGetDataQuery {
    landingPage(filter: { id: { eq: "163817886" } }) {
      id
    }
  }
`

export default Page
