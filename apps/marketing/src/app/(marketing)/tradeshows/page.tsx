'use client'

import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import CmsLandingPageV2 from '@components/common/CmsLandingPageV2'
import {
  TradeShowIndexPageGetDataQuery,
  TradeShowIndexPageGetDataQueryVariables,
} from '@generated/types'
import routes from '@lib/routes'
import { notFound } from 'next/navigation'
import React from 'react'

const Page = () => {
  const { data } = useSuspenseQuery<
    TradeShowIndexPageGetDataQuery,
    TradeShowIndexPageGetDataQueryVariables
  >(GET_DATA, {
    variables: {},
  })

  const landingPage = data?.landingPage

  if (!landingPage) {
    console.error('Landing page 163817886 not found')
    notFound()
  }

  return (
    <CmsLandingPageV2
      href={routes.internal.tradeshows.href()}
      landingPage={landingPage}
    />
  )
}

const GET_DATA = gql`
  ${CmsLandingPageV2.fragments.landingPage}
  query TradeShowIndexPageGetDataQuery {
    landingPage(filter: { id: { eq: "163817886" } }) {
      id
      ...CmsLandingPageV2Fragment
    }
  }
`

export default Page
